import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  constructor(private slService: ShoppingListService) {}

  recipesChanged = new Subject<Recipe[]>();

//   private recipes: Recipe[] = [
//     new Recipe(
//       'A Test Recipe',
//       'This is simply a test',
//       'https://picsum.photos/id/237/200/300',
//       [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
//     ),
//   ];

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recieps: Recipe[]) {
    this.recipes = recieps;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }
}
