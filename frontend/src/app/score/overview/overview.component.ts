import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ScoreService} from "../score.service";
import {ToastrService} from "ngx-toastr";
import {Discipline} from "../dto/discipline.dto";
import {FullScore, Run} from "../dto/score.dto";
import {firstValueFrom} from "rxjs";
import {RunService} from "../run/run.service";
import {GetRunFromRunsPipe} from "../../shared/pipes";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  disciplines: Discipline[] = [];
  currentDiscipline: Discipline = {totalRuns: 0, name: '', ratedRuns: 0, id: '', createdBy: ''};
  selectedDiscipline: string = '';
  scores: FullScore[] = [];

  constructor(
    private scoreService: ScoreService,
    private runService: RunService,
    private getRunFromRunsPipe: GetRunFromRunsPipe,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.disciplines = await firstValueFrom(this.scoreService.getDisciplines());
    this.scores = await firstValueFrom(this.scoreService.getFullScores());
    this.selectedDiscipline = this.disciplines[2].id;
    this.changeDiscipline();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  changeDiscipline() {
    if(this.selectedDiscipline) {
      this.currentDiscipline = this.disciplines.find((discipline) => discipline.id === this.selectedDiscipline)!;
    }
    this.displayedColumns = ['place','teamname']
    for (let i = 0; i < this.currentDiscipline.totalRuns; i++) {
      this.displayedColumns.push(`run${i + 1}`);
    }
    this.displayedColumns.push('sum');

    let teams: any = this.scores.filter(score => score.discipline === this.currentDiscipline.id);
    teams = teams.map((team: any, index: number) => {
      return {
        teamname: team.teamname,
        id: team._id,
        runs: this.calculateSum(this.currentDiscipline, team.runs),
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
      this.router.navigate([`/punkte/lauf/${score.id}/${this.currentDiscipline.name.toLowerCase()}/${runNumber}`]);
    } else {
      console.log(run);
      this.router.navigate([`/punkte/lauf/${score.id}/${this.currentDiscipline.name.toLowerCase()}/${run._id}`]);
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
