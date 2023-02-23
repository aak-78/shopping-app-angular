import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeEditForm: FormGroup<{
    name: FormControl<string>;
    imagePath: FormControl<string>;
    description: FormControl<string>;
    ingredients: FormArray;
  }>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Recipe Edit stated');
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeEditForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeEditForm.value['name'],
      this.recipeEditForm.value['imagePath'],
      this.recipeEditForm.value['description'],
      this.recipeEditForm.value['ingredients']
    );
    console.log(this.recipeEditForm.value);
    // we can use form value instead ->
    // const newRecipe = this.recipeEditForm.value
    if (this.editMode) {
      this.recipeService.updateRecipe(newRecipe, this.id);
    } else {
      this.recipeService.addNewRecipe(<Recipe>this.recipeEditForm.value);
    }
    this.onClear();
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeEditForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onClear() {
    this.id = null;
    this.editMode = false;
    // this.recipeEditForm.get('ingredients').setValue([{}]);
    this.recipeEditForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  }
}
