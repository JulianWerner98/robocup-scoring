import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { OverviewComponent } from './overview/overview.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {GetArrayWithNumbersPipe, GetRunFromRunsPipe, SecondsToTimePipe} from "../shared/pipes";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OverviewComponent,
    GetArrayWithNumbersPipe,
    GetArrayWithNumbersPipe,
    GetRunFromRunsPipe,
    SecondsToTimePipe
  ],
  imports: [
    CommonModule,
    ScoreRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule
  ],
  providers: [
    GetArrayWithNumbersPipe,
    GetRunFromRunsPipe
  ]
})
export class ScoreModule { }
