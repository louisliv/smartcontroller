import { Component, OnInit } from '@angular/core';
import { faSpinner, faTint, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from '../navbar/navbar.service';
import { WeatherService } from "../shared/services/weather.service";
import { WeatherIcons } from "../shared/services/weather-icons";
import CurrentWeather from '../models/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  currentWeather: CurrentWeather;
  currentWeatherIcon: any;
  currentCity: string;
  isLoaded: boolean;
  loadError: any;
  faSpinner = faSpinner;
  faTint = faTint;
  faCaretLeft = faChevronLeft;
  faCaretRight = faChevronRight;

  constructor(
    private weatherService: WeatherService,
    private navbar: NavbarService
  ) { }

  ngOnInit(): void {
    this.navbar.set(["/home"], "Weather")

    this.weatherService.weatherData.subscribe(x => {
      this.currentWeather = x;
      if (x.current) {
        this.isLoaded = true;
      }
    });

    this.weatherService.currentCity.subscribe(x => this.currentCity = x)

    this.weatherService.currentIcon.subscribe(x => this.currentWeatherIcon = x)
  }

  getDayIcon(icon: string) {
    return WeatherIcons[icon]
  }

  slide(direction){
    var container = document.getElementById('h-scroll-container');
    var scrollCompleted = 0;
    var slideVar = setInterval(function(){
        if(direction == 'left'){
            container.scrollLeft -= 30;
        } else {
            container.scrollLeft += 30;
        }
        scrollCompleted += 30;
        if(scrollCompleted >= 100){
            window.clearInterval(slideVar);
        }
    }, 30);
  }
}
