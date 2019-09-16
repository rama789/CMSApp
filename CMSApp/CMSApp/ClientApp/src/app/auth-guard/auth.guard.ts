import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Global} from '../global'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private global: Global
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.global.isLoggedIn) {
      return of(true);
    }
    this.router.navigate(["/login"]);
  }
}
