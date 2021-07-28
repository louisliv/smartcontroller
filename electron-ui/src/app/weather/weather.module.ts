import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class WeatherModule { }
