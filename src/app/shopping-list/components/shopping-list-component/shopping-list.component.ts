import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/types/ingredient.model';

import { ShoppingListService } from '../../services/shopping-list.service';

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
