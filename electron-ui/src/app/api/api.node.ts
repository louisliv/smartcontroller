import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Node } from "./../models/node";
import { AppConfig } from './../../environments/environment';

// this service be call in the appointments page component for back-end communications
@Injectable()
export class NodeApi {

    constructor(private http: HttpClient) { }

    getAll() : Observable<Node[]>{
        return this.http.get<Node[]>(`${AppConfig.apiUrl}/nodes/`)
    }

    get(id:number) : Observable<Node>{
        return this.http.get<Node>(`${AppConfig.apiUrl}/nodes/${id}`)
    }
}