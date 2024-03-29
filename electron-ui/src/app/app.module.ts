import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ApiServicesModule } from './api/api.services.module';
import { AuthInterceptor } from './api/api.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeModule } from './home/home.module';
import { NodeModule } from "./node/node.module";

import { AppComponent } from './app.component';
import { DeviceModule } from './device/device.module';
import { NavbarModule } from "./navbar/navbar.module";
import { LocalStorageService } from './shared/services/localStorage.service';
import { SettingsModule } from './settings/settings.module';
import { WeatherModule } from './weather/weather.module';
import { WeatherService } from './shared/services/weather.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    NodeModule,
    DeviceModule,
    SettingsModule,
    WeatherModule,
    AppRoutingModule,
    ApiServicesModule,
    NavbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CookieService,
    LocalStorageService,
    WeatherService,
    { provide: "WINDOW", useValue: window },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
