import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DeviceApi } from './api.device';
import { NodeApi } from "./api.node";
import { KeyboardApi } from "./api.keyboard";
import { WeatherApi } from './api.weather';

@NgModule({
    providers: [
        DeviceApi,
        NodeApi,
        KeyboardApi,
        WeatherApi
    ],
    declarations: [],
    imports: [HttpClientModule]
})
export class ApiServicesModule { }
