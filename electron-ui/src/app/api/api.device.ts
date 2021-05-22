import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from "./../models/device";
import { DiscoverDevice } from "./../models/discover-device";
import { AppConfig } from './../../environments/environment';

// this service be call in the appointments page component for back-end communications
@Injectable()
export class DeviceApi {

    constructor(private http: HttpClient) { }

    getAll() : Observable<Device[]>{
        return this.http.get<Device[]>(`${AppConfig.apiUrl}/devices/`)
    }

    get(id:number) : Observable<Device>{
        return this.http.get<Device>(`${AppConfig.apiUrl}/devices/${id}`)
    }

    powerOn(id:number) : Observable<{}>{
        return this.http.get<{}>(`${AppConfig.apiUrl}/devices/${id}/power_on`)
    }
    
    powerOff(id:number) : Observable<{}> {
        return this.http.get<{}>(`${AppConfig.apiUrl}/devices/${id}/power_off`)
    }

    power(id:number) : Observable<{}>{
        return this.http.post<{}>(`${AppConfig.apiUrl}/devices/${id}/power/`, {})
    }
    
    discover() : Observable<DiscoverDevice[]>{
        return this.http.get<DiscoverDevice[]>(`${AppConfig.apiUrl}/devices/discover`)
    }
    
    changeColor(id: number, color: string) : Observable<{}>{
        return this.http.post<{}>(
            `${AppConfig.apiUrl}/devices/${id}/change_color/`, 
            { color: color }
        )
    }
    
    changeBrightness(id: number, brightness: string) : Observable<{}> {
        return this.http.post<{}>(
            `${AppConfig.apiUrl}/devices/${id}/change_brightness/`, 
            { brightness: brightness }
        )
    }
    
    getDeviceTypes() : Observable<[]>{
        return this.http.get<[]>(`${AppConfig.apiUrl}/devices/types`)
    }
}