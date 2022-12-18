import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserRepresentation} from "./dto/UserRepresentation.dto";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  updateUserProfile(userProfileDto: any) {
    return this.http
      .patch<UserRepresentation>(`${environment.baseUrlV1}/admin/user`, userProfileDto);
  }

  deleteAll() {
    return this.http
      .delete<UserRepresentation>(`${environment.baseUrlV1}/admin`);
  }
}
