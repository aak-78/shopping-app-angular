import { Component } from '@angular/core';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private apiService: ApiService) {}

  onGetAllRecipes() {
    this.apiService.getAllRecipes().subscribe();
  }

  onPutAllRecipes() {
    this.apiService.putAllRecipes();
  }
}
