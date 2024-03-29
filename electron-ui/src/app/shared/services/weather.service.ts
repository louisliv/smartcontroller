import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { take } from 'rxjs/operators';
import { interval } from "rxjs";
import { WeatherApi } from '../../api/api.weather';
import { WeatherIcons } from "./weather-icons";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./localStorage.service";
import CurrentWeather from "../../models/weather";
import { HttpClient } from "@angular/common/http";

interface IPLocation {
  lat: number;
  lon: number;
}

@Injectable()
export class WeatherService {
  lat: number;
  lng: number;
  source: any;

  private _currentIcon: BehaviorSubject<any> = new BehaviorSubject(null);
  public readonly currentIcon: Observable<any> = this._currentIcon.asObservable();

  private _weatherData: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly weatherData: Observable<CurrentWeather> = this._weatherData.asObservable();

  private _currentCity: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly currentCity: Observable<string> = this._currentCity.asObservable();

  private _hasApiKey: ReplaySubject<boolean> = new ReplaySubject(0);
  public readonly hasApiKey: Observable<boolean> = this._hasApiKey.asObservable();

  private _isLoading: ReplaySubject<boolean> = new ReplaySubject(0);
  public readonly isLoading: Observable<boolean> = this._isLoading.asObservable();

  constructor(
    private weatherApi: WeatherApi,
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.localStorage.watch('weatherApiKey').subscribe(key => {
      const hasKey: boolean = key ? true: false;
      this._hasApiKey.next(hasKey);
      if (hasKey) {
        this._setGeolocation()

        this.source = interval(900000).subscribe(() => {
          this._setGeolocation()
        })
      } else {
        if (this.source) {
          this.source.unsubscribe()
        }
      }
    })
  }

  _setGeolocation(): void {
    if (!this.lat || !this.lng) {
      this.http.get<IPLocation>('http://ip-api.com/json').subscribe({
        next: response => {
          this.lat = response.lat;
          this.lng = response.lon;
          this._getWeatherData();
          this._getCityData();
        }
      })
    } else {
      this._getWeatherData();
      this._getCityData();
    }
  }

  _getWeatherData(): void {
    this._isLoading.next(true)
    this.weatherApi.get(this.lat, this.lng).subscribe({
      next: (res: CurrentWeather) => {
        this._currentIcon.next(WeatherIcons[res.current.weather[0].icon])
        this._weatherData.next(res);
        this._isLoading.next(false)
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
