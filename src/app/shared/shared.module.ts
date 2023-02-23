import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent } from './components/alert/alert.component';
import { AlertDirective } from './components/alert/alert.directive';
import { Gear } from './components/gear/gear.component';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner.component';
import { Page404Component } from './components/page404/page404.component';
import { BasicHightlightDirective } from './directives/basic-hightlight/basic-hightlight.directive';
import { BetterHightlightDirective } from './directives/better-hightlight/better-hightlight.directive';
import { BetterHightlight2Directive } from './directives/better-hightlight/better-hightlight2.directive';
import { DropDownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    AlertComponent,
    AlertDirective,
    Gear,
    LoadingSpinner,
    DropDownDirective,
    Page404Component,
    BasicHightlightDirective,
    BetterHightlightDirective,
    BetterHightlight2Directive,
  ],
  imports: [CommonModule, NgbModule],
  exports: [
    AlertComponent,
    AlertDirective,
    Gear,
    LoadingSpinner,
    DropDownDirective,
    Page404Component,
    BasicHightlightDirective,
    BetterHightlightDirective,
    BetterHightlight2Directive,
  ],
})
export class SharedModule {}
