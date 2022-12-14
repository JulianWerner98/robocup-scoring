import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    data: {
      public: true
    }
  },

  {
    path: 'nutzer',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user-profile/user-profile.module').then((m) => m.UserProfileModule),
    data: {
      roles: ['default-roles-robocup']
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
