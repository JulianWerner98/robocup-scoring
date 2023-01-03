import {Component, OnInit} from '@angular/core';
import {LineRun} from "./model/line-run";
import {ActivatedRoute, Router} from "@angular/router";
import {ScoreService} from "../../../score.service";
import {Team} from "../../../dto/score.dto";
import {RunService} from "../../run.service";
import {Discipline} from "../../../dto/discipline.dto";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-create-line',
  templateUrl: './create-line.component.html',
  styleUrls: ['./create-line.component.scss']
})
export class CreateLineComponent implements OnInit {
  scoreId: string = "";
  run: LineRun = new LineRun();
  subtotal: number = 0;
  multiplier: number = 1;
  private team: Team | undefined;
  teamname: any;

  constructor(
    private route: ActivatedRoute,
    private scoreService: ScoreService,
    private runService: RunService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.scoreId = params['id'];
      this.scoreService.getTeam(this.scoreId).subscribe((team) => {
        this.team = team;
        this.teamname = team.teamname;
        if (isNaN(+params['runId'])) {
          this.runService.getLineRun(params['runId']).subscribe((run) => {
            this.run.value = run.value;
            this.run.number = run.number;
            this.run.id = run.id;
            this.run.startTime = run.startTime;
            this.run.points = run.points;
            this.run.firstReview = run.firstReview;
            this.run.secondReview = run.secondReview;
            this.run.time = run.time;
            this.run.arena = run.arena;
            this.run.referee = run.referee;
            this.run.remarks = run.remarks;
            console.log(this.run.value.sections);

            this.calculate();
          })
        } else {
          this.scoreService.getDisciplines().subscribe((disciplines) => {
            let find = disciplines.find((discipline: Discipline) => discipline.id === team.discipline);
            if (find.totalRuns < +params['runId']) {
              this.toastr.error("Höhere Runde als eingestellt");
              this.router.navigate(['punkte']);
              return;
            }
            this.run.number = +params['runId'];
          });
        }
        this.calculate();
      });
    });
    this.calculate();
  }

  calculate() {
    this.subtotal = this.run.calculateSubtotal();
    this.multiplier = this.run.calculateMultiplier();
    this.run.points = Math.round(this.subtotal * this.multiplier);
  }

  valueChanged() {
    this.calculate();
  }

  saveRun() {
    if (this.run.id) {
      this.runService.updateRun(this.run).subscribe(() => {
        this.toastr.success("Lauf gespeichert");
        this.router.navigate(['punkte']);
      });
    } else {
        this.runService.createRun(this.scoreId, this.run).subscribe(() => {
        this.toastr.success("Lauf gespeichert");
        this.router.navigate(['punkte']);
      });

    };
  }
}
