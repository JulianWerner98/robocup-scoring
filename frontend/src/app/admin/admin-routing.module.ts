import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../auth.interceptor";

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ToastrService
  ]
})
export class AdminRoutingModule {
}
