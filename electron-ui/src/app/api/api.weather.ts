import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from './../../environments/environment';
import { LocalStorageService } from '../shared/services/localStorage.service';

@Injectable()
export class WeatherApi {
  private weatherApiKey: string;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    this.localStorage.watch('weatherApiKey').subscribe(key => this.weatherApiKey = key)
  }

  get(lat: number, lng: number) : Observable<any>{
    const url = `${AppConfig.weatherApiUrl}/data/2.5/onecall` +
      `?lat=${lat}&lon=${lng}&exclude=minutely&appid=` +
      `${this.weatherApiKey}&units=imperial`;
    return this.http.get<any>(url)
  }

  cityData(lat: number, lng: number) : Observable<any>{
    const url = `${AppConfig.weatherApiUrl}/geo/1.0/reverse` +
      `?lat=${lat}&lon=${lng}&limit=1&appid=${this.weatherApiKey}`;
    return this.http.get<any>(url)
  }
}
