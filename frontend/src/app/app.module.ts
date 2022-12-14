import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {environment} from 'src/environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomPaginator} from "../assets/customPaginatorConfiguration";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {MatSelectModule} from '@angular/material/select';
import {ToastrModule, ToastrService} from "ngx-toastr";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.kUrl,
        realm: environment.kRealm,
        clientId: environment.kClientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MatSelectModule,
    ToastrModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {provide: Window, useValue: window},
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: MatPaginatorIntl, useValue: CustomPaginator()},
    CookieService,
    ToastrService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

