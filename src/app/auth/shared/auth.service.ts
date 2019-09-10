import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// tslint:disable-next-line: import-blacklist
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';

// import * as jwt from 'jsonwebtoken';
import { JwtHelperService } from '@auth0/angular-jwt';

// https://medium.com/@elbaumpj/how-to-use-moment-js-in-angular-projects-5bec9157c56a
import * as moment from 'moment';

const jwt = new JwtHelperService();


class DecodedToken {
  exp: number = 0;
  usename: string = '';
}

@Injectable()
export class AuthService {

  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }

  public registerService(userData: any): Observable<any> {
    return this.http.post('http://localhost:3001/api/v1/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('http://localhost:3001/api/v1/users/auth', userData).pipe(map(
      (token: string) => {
        // we will returned to our subscribe into ts file
        // debugger;
        return this.saveToken(token);
      }
    ));
  }

  public logout() {
    localStorage.removeItem('bwm_auth');
    localStorage.removeItem('bwm_meta');
    // reset value to default
    this.decodedToken = new DecodedToken();

  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string {
    return localStorage.getItem('bwm_auth');
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

  public getUserId(): string {
    return this.decodedToken.userId;
  }
}
