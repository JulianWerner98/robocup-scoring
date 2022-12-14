import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../auth.interceptor";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class HomeModule {
}
