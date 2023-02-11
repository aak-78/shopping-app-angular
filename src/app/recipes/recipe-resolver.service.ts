import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from '../shared/api.service';
import { Recipe } from './recipe-list/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private apiService: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    // в Обучалке был фагмет где не сохранялись данные так как ресолв обновлял страницу и все стиралось.
    // Макс добавил privat recipeService и добавил проверку на this.recipeService.recipes === 0 и тогда return getAllRecipes
    return this.apiService.getAllRecipes();
  }
}
