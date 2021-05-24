import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from "./../models/device";

// this service be call in the appointments page component for back-end communications
@Injectable()
export class KeyboardApi {

    constructor(private http: HttpClient) { }

    sendCommand(device: Device, command: string) : Observable<{}>{
        let url = `http://${device.ip}:3000/btn-click`
        return this.http.post<{}>(url, {'button': command})
    }

    keyboard(device: Device, literal: string) : Observable<{}>{
        let url = `http://${device.ip}:3000/keyboard`
        return this.http.post<{}>(url, {'literal': literal})
    }
}