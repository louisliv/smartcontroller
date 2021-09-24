import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-navbar-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class NavbarWeatherComponent implements OnInit {
  weatherData: any;
  currentIcon: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.weatherData.subscribe(x => this.weatherData = x);
    this.weatherService.currentIcon.subscribe(x => this.currentIcon = x);
  }
}
