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
import {ScoreService} from "./score/score.service";
import {firstValueFrom} from "rxjs";
import {Discipline} from "./score/dto/discipline.dto";
import {Score, Team} from "./score/dto/score.dto";

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
    private scoreService: ScoreService,
  ) {
    GlobalErrorHandler.toastr = toastr;
  }

  async ngOnInit() {
    registerLocaleData(localeFr);
    this.authenticated = await this.keycloakService.isLoggedIn();
    if (this.authenticated) {
      this.userProfile = await this.keycloakService.loadUserProfile();
      this.roles = this.keycloakService.getUserRoles();
      if (this.roles.includes('quali')) {
        this.scoreService.getDisciplines().subscribe(async (disciplines) => {
          if (!disciplines.length) {
            await this.initIfNotExist();
          }
        });
      }
    }
  }


  private async initIfNotExist() {
    this.toastr.info('Import für Standort wird vorbereitet');
    let locations = await firstValueFrom(this.scoreService.getLocations());
    let location = (this.userProfile as any).attributes.location[0];
    let availableLeagues = locations.find((l: any) => l.name === location).available;
    this.scoreService.createDisciplines(availableLeagues.find((l: any) => l.league === 'Rescue').discipline)
      .subscribe((disciplines: Discipline[]) => {
        this.scoreService.getTeams().subscribe((teams) => {
          teams = teams.filter((t: Team) => t.league === 'Rescue')
          this.scoreService.initScores(
            teams.map((team: Team) => {
              return {
                originalId: team.id,
                teamname: team.name,
                discipline: disciplines.find((d: Discipline) => d.name === team.discipline)!.id,
                location,
              } as Score;
            })
          )
            .subscribe((scores: Score[]) => {
              this.toastr.success('Import für Standort wurde erfolgreich durchgeführt');
            });
        });
      });
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

