import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [ShoppingListService],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    console.log('ShoppingListComp Init started');
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSub = this.shoppingListService.ingredientsChanged.subscribe({
      next: (newIngredients: Ingredient[]) => {
        this.ingredients = newIngredients;
      },
      error: (err) => {
        console.log('Error');
      },
    });
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.editItemIndex.next(index);
    console.log('Edit: ', index);
  }
}
