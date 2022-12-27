import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RunRoutingModule } from './run-routing.module';
import { CreateLineComponent } from './create-line/create-line.component';
import { RunComponent } from './run.component';
import { OverviewRowComponent } from './overview-row/overview-row.component';
import {ScoreModule} from "../score.module";
import {
  GetExitBonusPipe,
  GetVictimsBonusPipe,
  GetRescueKitBonusPipe,
  GetSectionPointsPipe,
  GetDeductionPipe
} from "./pipes";


@NgModule({
  declarations: [
    RunComponent,
    CreateLineComponent,
    OverviewRowComponent,
    GetSectionPointsPipe,
    GetExitBonusPipe,
    GetRescueKitBonusPipe,
    GetVictimsBonusPipe,
    GetDeductionPipe,
  ],
  imports: [
    RunRoutingModule,
    ScoreModule,
    CommonModule
  ],
  bootstrap: [RunComponent]
})
export class RunModule { }
