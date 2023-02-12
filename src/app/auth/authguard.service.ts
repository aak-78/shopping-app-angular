import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard
  implements CanActivate, CanActivateChild, OnInit, OnDestroy
{
  subs: Subscription;
  userActivated: boolean;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.subs = this.authService.userAuthorized$.subscribe((response) => {
      this.userActivated = response;
      console.log('AuthGuard userActivated:', this.userActivated);
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.subs = this.authService.userAuthorized$.subscribe((response) => {
      this.userActivated = response;
      console.log('AuthGuard userActivated:', this.userActivated);
    });
    if (this.userActivated) {
      return true;
    } else {
      this.authService.errorMessage$.next(
        'Please autorize to rich Recipes and Shopping List'
      );
      console.log('AuthGuard redirect');
      this.authService.errorMessage$.subscribe((v) => console.log(v));
      return this.router.parseUrl('/auth');
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(route, state);
  }
}
