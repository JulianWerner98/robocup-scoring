import {Injectable} from "@angular/core";
import {Run} from "../dto/score.dto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LineRun} from "./line/create-line/model/line-run";

@Injectable({
  providedIn: 'root'
})
export class RunService {

  constructor(private http: HttpClient) { }

  createRun(id: string, run: LineRun): Observable<LineRun> {
    return this.http.post<LineRun>(`${environment.baseUrlV1}/run/${id}`, {run});
  }

  getLineRun(id: string,): Observable<LineRun> {
    return this.http.get<LineRun>(`${environment.baseUrlV1}/run/${id}`);
  }

  updateRun(run: LineRun) {
    return this.http.patch<LineRun>(`${environment.baseUrlV1}/run/${run.id}`, {run});
  }
}
