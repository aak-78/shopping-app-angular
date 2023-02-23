import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/authguard.service';
import { Page404Component } from '../shared/components/page404/page404.component';
import { RecipesComponent } from './components/recipe-component/recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './components/recipe-start/recipe-start.component';
import { RecipeResolverService } from './services/recipe-resolver.service';

const routes: Routes = [
  {
    path: '',
    resolve: [RecipeResolverService],
    component: RecipesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        // component: RecipeStartComponent,
        children: [
          { path: 'new', component: RecipeEditComponent, resolve: null },
          {
            path: ':id',
            component: RecipeDetailComponent,
            // resolve: [RecipeResolverService],
          },
          {
            path: ':id/edit',
            component: RecipeEditComponent,
            // resolve: [RecipeResolverService],
          },
          {
            path: '',
            component: RecipeStartComponent,
            // resolve: [RecipeResolverService],
          },
          // {
          //   path: '',
          //   pathMatch: 'full',
          // },
          { path: '**', component: Page404Component },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
