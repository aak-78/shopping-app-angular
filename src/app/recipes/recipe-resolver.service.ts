import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from '../shared/api.service';
import { Recipe } from './recipe-list/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private apiService: ApiService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    // в Обучалке был фагмет где не сохранялись данные так как ресолв обновлял страницу и все стиралось.
    // Макс добавил privat recipeService и добавил проверку на this.recipeService.recipes === 0 и тогда return getAllRecipes
    // Добавил сам - надо еще добавить проверку на сохранение в CanLeave в Роутинге
    let recipes: Recipe[] = this.recipeService.getRecipes();
    console.log('Recipe in resolver: ', recipes);
    if (recipes.length == 0) {
      return this.apiService.getAllRecipes();
    }
    return recipes;
  }
}
