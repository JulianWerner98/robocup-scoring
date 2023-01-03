import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateLineComponent} from "./line/create-line/create-line.component";
import {RunComponent} from "./run.component";

const routes: Routes = [
  {
    path: '',
    component: RunComponent,
    children: [
      {
        path: ':id/line/:runId',
        component: CreateLineComponent,
      }
    ]
  },
  {
    path: '',
    component: RunComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunRoutingModule {
}
