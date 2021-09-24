import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from './../../environments/environment';

// this service be call in the appointments page component for back-end communications
@Injectable()
export class WeatherApi {
  constructor(private http: HttpClient) { }

  get(lat: number, lng: number) : Observable<any>{
    const url = `${AppConfig.weatherApiUrl}/data/2.5/onecall` +
      `?lat=${lat}&lon=${lng}&exclude=minutely&appid=` +
      `${AppConfig.weatherApiKey}&units=imperial`;
    return this.http.get<any>(url)
  }

  cityData(lat: number, lng: number) : Observable<any>{
    const url = `${AppConfig.weatherApiUrl}/geo/1.0/reverse` +
      `?lat=${lat}&lon=${lng}&limit=1&appid=${AppConfig.weatherApiKey}`;
    return this.http.get<any>(url)
  }
}
