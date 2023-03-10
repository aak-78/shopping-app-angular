import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthComponent } from '../auth/components/auth-component/auth.component';
import { AuthService } from '../auth/services/auth.service';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthorized: boolean;
  subs: Subscription;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private authComponent: AuthComponent
  ) {}

  ngOnInit(): void {
    this.subs = this.authService.userAuthorized$.subscribe(
      (r) => (this.userAuthorized = r)
    );
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

  isLogout() {
    this.authComponent.authForm.reset();
    this.authService.logout();
  }
}
