import { Component, OnInit } from '@angular/core';
import { faCloud, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-navbar-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class NavbarWeatherComponent implements OnInit {
  weatherData: any;
  currentIcon: any;
  apiKeySet: boolean;
  faBan = faBan;
  faCloud = faCloud;
  faSpinner = faSpinner;
  weatherLoading: boolean = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.isLoading.subscribe(x => this.weatherLoading = x);
    this.weatherService.weatherData.subscribe(x => this.weatherData = x);
    this.weatherService.currentIcon.subscribe(x => this.currentIcon = x);
    this.weatherService.hasApiKey.subscribe(x => this.apiKeySet = x);
  }
}
