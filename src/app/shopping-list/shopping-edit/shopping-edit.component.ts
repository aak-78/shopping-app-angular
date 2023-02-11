import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') editForm: NgForm;
  editItem: Ingredient;
  editItemIndex: number;
  editMode: boolean = false;
  subscriptionEdit: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  onSubmit() {
    const value = this.editForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editItemIndex,
        newIngredient
      );
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editForm.resetForm();
  }

  onClear() {
    this.editMode = false;
    this.editForm.resetForm();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnInit() {
    this.subscriptionEdit = this.shoppingListService.editItemIndex.subscribe(
      (index: number) => {
        this.editItem = this.shoppingListService.getIngredient(index);
        this.editItemIndex = index;
        this.editMode = true;
        this.editForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptionEdit.unsubscribe();
  }
}
