import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {KeycloakProfile} from "keycloak-js";
import {ToastrService} from "ngx-toastr";
import {environment} from './../environments/environment';
import {CookieService} from "ngx-cookie-service";
import {CookieHandler} from "./shared/cookieHandler";
import {GlobalErrorHandler} from "./shared/GlobalErrorHandler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authenticated = true;
  userProfile: KeycloakProfile | null = null;
  roles: string[] = [];
  local: boolean = environment.local;
  cookieHandler: CookieHandler = new CookieHandler(this.cookieService);

  constructor(
    private keycloakService: KeycloakService,
    private window: Window,
    private toastr: ToastrService,
    private cookieService: CookieService,
  ) {
    GlobalErrorHandler.toastr = toastr;
  }

  async ngOnInit() {
    registerLocaleData(localeFr);
    this.authenticated = await this.keycloakService.isLoggedIn();
    if (this.authenticated) {
      this.userProfile = await this.keycloakService.loadUserProfile();
      this.roles = this.keycloakService.getUserRoles();
    }
  }


  public login() {
    this.keycloakService.login();
  }

  public logout() {
    this.keycloakService.logout(this.window.location.origin);
  }

  public hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}

