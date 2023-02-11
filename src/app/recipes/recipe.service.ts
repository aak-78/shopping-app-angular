import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe-list/recipe.model';

@Injectable()
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  recipeisChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test recipe',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
  //     'Best recipe in da world!',
  //     [new Ingredient('Banana', 5), new Ingredient('Tomato', 2)]
  //   ),
  //   new Recipe(
  //     'A Test recipe 2',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
  //     'Yammy yammy',
  //     [
  //       new Ingredient('Apple', 3),
  //       new Ingredient('Strawberry', 5),
  //       new Ingredient('Berry', 2),
  //     ]
  //   ),
  // ];

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

  fetchRecipes() {
    
  }
}
