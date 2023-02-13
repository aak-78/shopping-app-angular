import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

// RESTApi service to connect with firebase database

@Injectable({ providedIn: 'root' })
export class ApiService {
  dbUrl =
    'https://angular-shopping-app-001-default-rtdb.europe-west1.firebasedatabase.app/';
  baseUrl =
    'https://angular-shopping-app-001-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  signupUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfq4yG5uQguBa2Du-mSEa4_C03ynmh0qs';
  key = 'AIzaSyCfq4yG5uQguBa2Du-mSEa4_C03ynmh0qs';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  errorMessage = new Subject<HttpErrorResponse>();
  response = {};

  getAllRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl).pipe(
      map((response) => {
        return response.map((element) => {
          return {
            ...element,
            ingredients: element.ingredients ? element.ingredients : [],
          };
        });
      }),
      tap((response: Recipe[]) => {
        return this.recipeService.updateAllRecipes(response);
      }),
      catchError((err) => this.handleError(err))
    );
  }

  // this.recipeService.updateAllRecipes(response)

  putAllRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.baseUrl, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    this.errorMessage.next(error.error);
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
