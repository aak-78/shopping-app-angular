import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubscription: Subscription;

  recipe: Recipe = null;
  id: number = null;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('recipe-list started');
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipeisChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );

    // From Recipe Detail part
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      if (+params['id'] !== null) {
        this.id = +params['id'];
        console.log('Recipe detail ID: ', this.id);
        this.recipe = this.recipeService.getRecipe(this.id);
      } else {
        return null;
      }
    });
    console.log("Activated Route ", this.route.snapshot.pathFromRoot)
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route.parent });
  }
}
