import { BehaviorSubject, Observable } from "rxjs";
import { take } from 'rxjs/operators';
import { interval } from "rxjs";
import { GeolocationService } from '@ng-web-apis/geolocation';
import { WeatherApi } from '../../api/api.weather';
import { WeatherIcons } from "./weather-icons";
import { Injectable } from "@angular/core";

@Injectable()
export class WeatherService {
  lat: number;
  lng: number;
  source: any;

  private _currentIcon: BehaviorSubject<any> = new BehaviorSubject(null);
  public readonly currentIcon: Observable<any> = this._currentIcon.asObservable();

  private _weatherData: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly weatherData: Observable<any> = this._weatherData.asObservable();

  private _currentCity: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly currentCity: Observable<string> = this._currentCity.asObservable();

  constructor(
    private weatherApi: WeatherApi,
    private geo: GeolocationService
  ) {
    this._setGeolocation()

    this.source = interval(900000).subscribe(() => {
      this._setGeolocation()
    })
  }

  _setGeolocation(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this._getWeatherData();
      this._getCityData();
    }, error => {
      this.geo.pipe(take(1)).subscribe(position => () => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this._getWeatherData();
        this._getCityData();
      });
    })
  }

  _getWeatherData(): void {
    this.weatherApi.get(this.lat, this.lng).subscribe({
      next: res => {
        this._currentIcon.next(WeatherIcons[res.current.weather[0].icon])
        this._weatherData.next(res);
      }
    })
  }

  _getCityData(): void {
    this.weatherApi.cityData(this.lat, this.lng).subscribe({
      next: res => {
        this._currentCity.next(`${res[0].name}, ${res[0].state}`);
      }
    })
  }
}
