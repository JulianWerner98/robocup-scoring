import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateLineComponent} from "./line/create-line/create-line.component";
import {RunComponent} from "./run.component";

const routes: Routes = [
  {
    path: 'line',
    component: RunComponent,
    children: [
      {
        path: '',
        component: CreateLineComponent,
      },
      {
        path: ':runNumber',
        component: CreateLineComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunRoutingModule {
}
