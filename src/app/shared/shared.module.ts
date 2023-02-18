import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BasicHightlightDirective } from '../directives/basic-hightlight/basic-hightlight.directive';
import { BetterHightlightDirective } from '../directives/better-hightlight/better-hightlight.directive';
import { BetterHightlight2Directive } from '../directives/better-hightlight/better-hightlight2.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertDirective } from './alert/alert.directive';
import { DropDownDirective } from './dropdown.directive';
import { Gear } from './gear/gear.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { Page404Component } from './page404/page404.component';

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
  imports: [BrowserModule, NgbModule],
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
