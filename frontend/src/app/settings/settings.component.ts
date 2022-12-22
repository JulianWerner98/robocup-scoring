import {Component, OnInit} from '@angular/core';
import {ScoreService} from "../score/score.service";
import {Discipline} from "../score/dto/discipline.dto";
import {SettingsService} from "./settings.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  disciplines: Discipline[] = [];

  constructor(
    private scoreService: ScoreService,
    private settingsService: SettingsService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.scoreService.getDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines;
    });
  }

  updateDiscipline(discipline: Discipline, rated: HTMLInputElement, total: HTMLInputElement) {
    let ratedRuns = +rated.value;
    let totalRuns = +total.value;
    if(ratedRuns == discipline.ratedRuns && totalRuns == discipline.totalRuns) {
      this.toast.info("Keine Änderungen vorgenommen");
      return;
    }
    if (ratedRuns <= 0 || totalRuns <= 0) {
      this.toast.error("Es müssen mindestens 1 Wertungslauf und 1 Gesamtlauf angegeben werden.");
      rated.value = discipline.ratedRuns.toString();
      total.value = discipline.totalRuns.toString();
      return;
    }
    if (ratedRuns > totalRuns) {
      this.toast.error("Die Anzahl der bewerteten Läufe darf nicht größer als die Anzahl der Läufe sein.");
      return;
    }

    this.settingsService.updateDiscipline(
      discipline.id,
      {
        ratedRuns: ratedRuns,
        totalRuns: totalRuns
      })
      .subscribe((returnValue) => {
        this.toast.success(discipline.name + ' erfolgreich geändert');
        const index = this.disciplines.findIndex((discipline) => discipline.id === returnValue.id);
        if (index > -1) {
          this.disciplines.splice(index, 1, returnValue);
        }
      });
  }
}
