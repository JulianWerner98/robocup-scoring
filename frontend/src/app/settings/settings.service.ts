import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Discipline} from "../score/dto/discipline.dto";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  updateDiscipline(id: string, discipline: { ratedRuns: number; totalRuns: number }): Observable<Discipline> {
    return this.http.patch<Discipline>(`${environment.baseUrlV1}/discipline/` + id, discipline);
  }
}
