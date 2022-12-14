import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {HttpErrorHandling} from "../../assets/httpErrorHandling";
import {catchError, Observable} from "rxjs";
import {UserRepresentation} from "./dto/UserRepresentation.dto";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  addDefaultRole() {
    return this.http
      .patch<any>(`${environment.baseUrlV1}/admin/default`, null)
      .pipe(catchError(error => HttpErrorHandling.errorHandling(error)));
  }

  addVolunteerRole() {
    return this.http
      .patch<any>(`${environment.baseUrlV1}/admin/volunteer`, null)
      .pipe(catchError(error => HttpErrorHandling.errorHandling(error)));
  }

  addFutureQualiRole(location: string) {
    return this.http
      .patch<any>(`${environment.baseUrlV1}/admin/futureQuali`, {location})
      .pipe(catchError(error => HttpErrorHandling.errorHandling(error)));
  }

  getFutureQuali(): Observable<UserRepresentation[]> {
    return this.http
      .get<UserRepresentation[]>(`${environment.baseUrlV1}/admin/futureQuali`)
      .pipe(catchError(error => HttpErrorHandling.errorHandling(error)));
  }

  getQuali(): Observable<UserRepresentation[]> {
    return this.http
      .get<UserRepresentation[]>(`${environment.baseUrlV1}/admin/quali`)
      .pipe(catchError(error => HttpErrorHandling.errorHandling(error)));
  }

  setQualiRole(id: string): Observable<UserRepresentation> {
    return this.http
      .patch<UserRepresentation>(`${environment.baseUrlV1}/admin/quali`, {id})
      .pipe(catchError(error => HttpErrorHandling.errorHandling(error)));
  }

  deleteQualiRole(id: string): Observable<UserRepresentation> {
    return this.http
      .delete<UserRepresentation>(`${environment.baseUrlV1}/admin/quali/` + id)
      .pipe(catchError(error => HttpErrorHandling.errorHandling(error)));
  }

  updateUserProfile(userProfileDto: any) {
    return this.http
      .patch<UserRepresentation>(`${environment.baseUrlV1}/admin/user`, userProfileDto)
      .pipe(catchError(error => HttpErrorHandling.errorHandling(error)));
  }

  deleteAll() {
    return this.http
      .delete<UserRepresentation>(`${environment.baseUrlV1}/admin`)
      .pipe(catchError(error => HttpErrorHandling.errorHandling(error)));
  }
}
