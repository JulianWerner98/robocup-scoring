import {Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";

export class HttpErrorHandling {
  static toastr: ToastrService;

  public static errorHandling(err: any): Observable<any> {
    console.error(err);
    if (err.status === 401) {
      window.location.reload();
      return err;
    }
    this.toastr.error(
      err.error.message ? err.error.message : err.message,
      "Error",
    );
    return err;
  }
}
