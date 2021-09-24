import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar.component';
import { NavbarWeatherComponent } from "./weather.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, NavbarWeatherComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    NavbarWeatherComponent
  ],
})
export class NavbarModule {}
