import {Injectable} from "@angular/core";
import {Run} from "../dto/score.dto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RunService {

  constructor(private http: HttpClient) { }

  createRun(id: string, runNumber: number): Observable<Run> {
    return this.http.post<Run>(`${environment.baseUrlV1}/run/${id}`, {runNumber});
  }
}
