import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { OverviewComponent } from './overview/overview.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {GetArrayWithNumbersPipe, GetRunFromRunsPipe, SecondsToTimePipe} from "../shared/pipes";


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
    MatTableModule
  ],
  providers: [
    GetArrayWithNumbersPipe,
    GetRunFromRunsPipe
  ]
})
export class ScoreModule { }
