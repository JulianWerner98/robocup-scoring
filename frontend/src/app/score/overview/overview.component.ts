import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ScoreService} from "../score.service";
import {Score} from "../dto/score.dto";
import {firstValueFrom} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  import = true;

  constructor(
    private scoreService: ScoreService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {

  }

  async importTeam() {
    let locations = await firstValueFrom(this.scoreService.getLocations());
    this.scoreService.getTeams().subscribe((teams) => {
      let scores: Score[] = [];
      for (let team of teams) {
        scores.push(
          {
            teamname: team.name,
            location: locations.find((location: any) => location.id === team.location)?.name,
            discipline: team.league + ' ' + team.discipline,
          });
      }
      this.scoreService.initScores(scores).subscribe((scores: Score[]) => {
        this.import = false;
        this.toastr.success('Import erfolgreich');
        console.log(scores);
      });
    });
  }

}
