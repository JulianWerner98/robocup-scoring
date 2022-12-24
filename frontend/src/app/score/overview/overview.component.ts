import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ScoreService} from "../score.service";
import {ToastrService} from "ngx-toastr";
import {Discipline} from "../dto/discipline.dto";
import {FullScore, Run} from "../dto/score.dto";
import {firstValueFrom} from "rxjs";
import {RunService} from "../run.service";
import {GetRunFromRunsPipe} from "../../shared/pipes";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  disciplines: Discipline[] = [];
  currentDiscipline: Discipline = {totalRuns: 0, name: '', ratedRuns: 0, id: '', createdBy: ''};
  scores: FullScore[] = [];

  constructor(
    private scoreService: ScoreService,
    private runService: RunService,
    private getRunFromRunsPipe: GetRunFromRunsPipe,
    private toastr: ToastrService
  ) {
  }

  async ngOnInit() {
    this.disciplines = await firstValueFrom(this.scoreService.getDisciplines());
    this.scores = await firstValueFrom(this.scoreService.getFullScores());
    this.changeDiscipline(this.disciplines[2]);
  }

  changeDiscipline(discipline: Discipline) {
    this.currentDiscipline = discipline;

    this.displayedColumns = ['place','teamname']
    for (let i = 0; i < discipline.totalRuns; i++) {
      this.displayedColumns.push(`run${i + 1}`);
    }
    this.displayedColumns.push('sum');

    let teams: any = this.scores.filter(score => score.discipline === discipline.id);
    teams = teams.map((team: any, index: number) => {
      return {
        teamname: team.teamname,
        id: team._id,
        runs: this.calculateSum(discipline, team.runs),
      }
    });
    teams.sort((a: any, b: any) => {
      let findA = a.runs.find((run: any) => run.number === 0);
      let findD = b.runs.find((run: any) => run.number === 0);
      if (findA.points === findD.points) {
        return findA.time > findD.time? 1 : -1;
      }
      return findA.points > findD.points? -1 : 1;
    });
    teams = teams.map((team: any, index: number) => {
      return {
        ...team,
        place: index + 1
      }
    });
    this.dataSource.data = teams;
  }

  goToRun(score: FullScore, runNumber: number) {
    let run = this.getRunFromRunsPipe.transform(runNumber, score.runs);
    if(!run) {
      this.runService.createRun(score.id!, runNumber).subscribe((run: Run) => {
        this.toastr.success(`Run ${runNumber} created`);
        score.runs.push(run);
        const index = this.dataSource.data.findIndex((searchedScore) => searchedScore.id === score.id);
        if (index > -1) {
          this.dataSource.data.splice(index, 1, score);
        }
      });
    }
  }

  private calculateSum(discipline: Discipline, runs: Run[]) {
    runs.sort((a, b) => {
      if (a.points === b.points) {
        return a.time > b.time? 1 : -1;
      }
      return a.points > b.points? -1 : 1;
    });
    let newRuns = [];
    let sumRun = {
      points: 0,
      time: 0,
      number: 0
    }
    for (let i = 0; i < runs.length; i++) {
      newRuns.push({
        ...runs[i],
        scored: i < discipline.ratedRuns
      })
      if (i < discipline.ratedRuns) {
        sumRun.points += runs[i].points;
        sumRun.time += runs[i].time;
      }
    }
    newRuns.push(sumRun);
    return newRuns;
  }
}
