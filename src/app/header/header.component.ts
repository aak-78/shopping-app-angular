import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthorized: boolean;
  subs: Subscription;
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subs = this.authService.userAuthorized$.subscribe(
      (r) => (this.userAuthorized = r)
    );
    console.log('Auth ', this.userAuthorized);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe;
  }

  onGetAllRecipes() {
    this.apiService.getAllRecipes().subscribe();
  }

  onPutAllRecipes() {
    this.apiService.putAllRecipes();
  }
}
