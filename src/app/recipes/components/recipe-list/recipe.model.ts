import { Ingredient } from '../../../shared/types/ingredient.model';

export class Recipe {
  public name: string;
  public imagePath: string;
  public description: string;
  public ingredients?: Ingredient[];

  constructor(
    name: string,
    imagePath: string,
    desc: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.imagePath = imagePath;
    this.description = desc;
    this.ingredients = ingredients;
  }
}
