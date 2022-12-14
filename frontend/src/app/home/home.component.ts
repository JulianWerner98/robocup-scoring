import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  authenticated = false;
  userProfile: KeycloakProfile | null = null;
  overview: string = "";

  constructor(
    private keycloakService: KeycloakService,
  ) {
  }

  async ngOnInit() {
    this.authenticated = await this.keycloakService.isLoggedIn();
    if (this.authenticated) {
      this.userProfile = await this.keycloakService.loadUserProfile();
    }
  }
}
