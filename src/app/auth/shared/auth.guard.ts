// Revise the AuthGuard to call it.
// src/app/auth/auth.guard.ts (v2)
// https://angular.io/guide/router

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private url: string;

  constructor(private auth: AuthService, private router: Router) { }

  private handleAuthState(): boolean {
    if (this.isLoginorRegister()) {
      this.router.navigate(['/rentals']);
      return false;
    }
    return true;

  }


  private handleNotAuthState(): boolean {
    if (this.isLoginorRegister()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }
  private isLoginorRegister(): boolean {
    if (this.url.includes('login') || this.url.includes('register')) {
      return true;
    }
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.url = state.url;


    if (this.auth.isAuthenticated()) {
      return this.handleAuthState();
    }
    return this.handleNotAuthState();
  }

}
