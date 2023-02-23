import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';

import { Ingredient } from '../../shared/types/ingredient.model';
import { Recipe } from '../components/recipe-list/recipe.model';

@Injectable()
export class RecipeService {
  recipeisChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addNewRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeisChanged.next(this.getRecipes());
  }

  updateRecipe(updatedRecipe: Recipe, index: number) {
    this.recipes[index] = updatedRecipe;
    this.recipeisChanged.next(this.getRecipes());
    console.log(this.getRecipes());
  }

  updateAllRecipes(updatedRecipes: Recipe[]) {
    this.recipes = updatedRecipes;
    this.recipeisChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeisChanged.next(this.getRecipes());
  }

  fetchRecipes() {}
}
