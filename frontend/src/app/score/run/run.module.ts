import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RunRoutingModule } from './run-routing.module';
import { CreateLineComponent } from './line/create-line/create-line.component';
import { RunComponent } from './run.component';
import { OverviewRowComponent } from './overview-row/overview-row.component';
import {ScoreModule} from "../score.module";
import {
  GetExitBonusPipe,
  GetVictimsMultiplierPipe,
  GetRescueKitBonusPipe,
  GetSectionPointsPipe,
  GetDeductionPipe
} from "./pipes";
import { SheetLineComponent } from './line/sheet-line/sheet-line.component';
import {FormsModule} from "@angular/forms";
import {SectionComponent} from "./line/sheet-line/section/section.component";


@NgModule({
  declarations: [
    RunComponent,
    CreateLineComponent,
    OverviewRowComponent,
    GetSectionPointsPipe,
    GetExitBonusPipe,
    GetRescueKitBonusPipe,
    GetVictimsMultiplierPipe,
    GetDeductionPipe,
    SheetLineComponent,
    SectionComponent,
  ],
    imports: [
        RunRoutingModule,
        ScoreModule,
        CommonModule,
        FormsModule
    ],
  bootstrap: [RunComponent]
})
export class RunModule { }
