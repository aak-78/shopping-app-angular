import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService], -> we declare Global provider in app.module.ts
  // coz we need to avoid the destriction of component when we switch to Ingredients screen
})
export class RecipesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
