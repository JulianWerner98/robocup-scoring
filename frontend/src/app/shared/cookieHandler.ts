import {CookieService} from "ngx-cookie-service";

export class CookieHandler {
  constructor(private cookieService: CookieService) {
  }

  public getCookie(name: string): boolean {
    return this.cookieService.get(name) ? true : false;
  }

  setCookie(name: string, value: string, days: number) {
    this.cookieService.set(name, value, {expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * days)})
  }
}
