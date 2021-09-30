import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar.component';
import { NavbarWeatherComponent } from "./weather.component";
import { RouterModule } from '@angular/router';
import { NgbTooltipModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NavbarComponent, NavbarWeatherComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule,
    NgbTooltipModule,
    NgbDropdownModule
  ],
  exports: [
    NavbarComponent,
    NavbarWeatherComponent
  ],
})
export class NavbarModule {}
