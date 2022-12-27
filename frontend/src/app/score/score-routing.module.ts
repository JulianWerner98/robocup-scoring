import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from "./overview/overview.component";

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
  },
  {
    path: ':kind/:id',
    loadChildren: () => import('./run/run.module').then(m => m.RunModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreRoutingModule {
}
