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

    power(id:number, childId: string|null = null) : Observable<{}>{
        return this.http.post<{}>(`${AppConfig.apiUrl}/devices/${id}/power/`, {
          childId:childId
        })
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

    post(device: Device) : Observable<Device> {
        let url;

        if (device.id) {
            url = `${AppConfig.apiUrl}/devices/${device.id}/`;
            return this.http.put<Device>(url, device);
        } else {
            url = `${AppConfig.apiUrl}/devices/`;
            return this.http.post<Device>(url, device);
        }
    }

    roku(id: number, command: string, argument: string = null) : Observable<{}> {
        return this.http.post<{}>(
            `${AppConfig.apiUrl}/devices/${id}/roku/`,
            {
                command: command,
                argument: argument
            }
        )
    }

    firetv(id: number, command: string, argument: string = null) : Observable<{}> {
        return this.http.post<{}>(
            `${AppConfig.apiUrl}/devices/${id}/firetv/`,
            {
                command: command,
                argument: argument
            }
        )
    }

    registered(id: number): Observable<{}> {
      return this.http.get<{}>(`${AppConfig.apiUrl}/devices/${id}/check_registration/`)
    }

    register(id: number): Observable<{}> {
      return this.http.post<{}>(`${AppConfig.apiUrl}/devices/${id}/register/`, {})
    }

    lg(id: number, command: string, argument: string = null, type='input'): Observable<{}> {
      return this.http.post<{}>(
        `${AppConfig.apiUrl}/devices/${id}/lg/`,
        {
          command: command,
          argument: argument,
          type: type
        }
      )
    }

    sources(id: number): Observable<any[]> {
      return this.http.get<any[]>(`${AppConfig.apiUrl}/devices/${id}/get_sources/`)
    }

    setSource(id: number, sourceId: string): Observable<{}> {
      return this.http.post<{}>(`${AppConfig.apiUrl}/devices/${id}/set_source/`, { id: sourceId })
    }
}
