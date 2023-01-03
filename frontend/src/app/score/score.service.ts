import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FullScore, Score, Team} from "./dto/score.dto";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Discipline} from "./dto/discipline.dto";


@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private httpClient: HttpClient) { }

  initScores(scores: Score[]): Observable<Score[]> {
    return this.httpClient.post<Score[]>(`${environment.baseUrlV1}/score/init`, {scores});
  }

  getTeams(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(`${environment.baseUrlV1Anmeldung}/team`);
  }

  getTeam(teamId: string): Observable<Team> {
    return this.httpClient.get<Team>(`${environment.baseUrlV1}/score/${teamId}`);
  }

  getLocations():Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrlV1Anmeldung}/location`);
  }

  getDisciplines() {
    return this.httpClient.get<any>(`${environment.baseUrlV1}/discipline`);
  }

  createDisciplines(availableLeagues: string[]): Observable<Discipline[]> {
    return this.httpClient.post<Discipline[]>(`${environment.baseUrlV1}/discipline`, {disciplines: availableLeagues});
  }

  getFullScores(): Observable<FullScore[]> {
    return this.httpClient.get<FullScore[]>(`${environment.baseUrlV1}/score/full`);
  }
}
