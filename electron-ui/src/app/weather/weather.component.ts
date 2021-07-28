import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from '../navbar/navbar.service';
import { LocalStorageService } from "../shared/services/localStorage.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  lat: number;
  lon: number;
  weatherApiKey: string;
  currentWeather: {};
  currentWeatherIcon: string;
  currentTemp: number;
  isLoaded: boolean;
  loadError: any;
  faSpinner = faSpinner;
  cityName: string;
  cityNameLoaded: boolean;
  baseUrl = "https://api.openweathermap.org";
  iconBaseUrl = "https://openweathermap.org";

  constructor(
    private http: HttpClient, 
    private location: LocalStorageService,
    private navbar: NavbarService
  ) { }

  ngOnInit(): void {
    this.navbar.set(["/home"], "Weather")
    this.location.watch('weatherApiKey').subscribe(key => {
      this.weatherApiKey = key;
    })

    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;

      var weatherApiUrl = `${this.baseUrl}/data/2.5/onecall?lat=${this.lat}` +
        `&lon=${this.lon}&units=imperial&appid=${this.weatherApiKey}`;

      var cityApiUrl = `${this.baseUrl}/geo/1.0/reverse?lat=${this.lat}` +
        `&lon=${this.lon}&limit=1&appid=${this.weatherApiKey}`;

      this.http.get(cityApiUrl).subscribe({
        next: cities => {
          this.cityName = `${cities[0].name}, ${cities[0].state}`;
          this.cityNameLoaded;
        }
      })

      this.http.get<{}>(weatherApiUrl).subscribe({
        next: data => {
          console.log(data);
          this.currentWeather = data['current']['weather'][0];
          this.currentTemp = parseInt(data['current']['temp'])
          this.currentWeatherIcon = `${this.iconBaseUrl}/img/wn/${this.currentWeather['icon']}@4x.png`
          this.isLoaded = true;
          this.loadError = false;
        }
      })
    });
  }

}
