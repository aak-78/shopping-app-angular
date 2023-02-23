import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './components/auth-component/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    // HttpClientModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],
  exports: [AuthComponent, RouterModule],
})
export class AuthModule {}
