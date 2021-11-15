import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeviceRoutingModule } from './device-routing.module';

import { DeviceComponent } from './device.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { PlugComponent } from './plug/plug.component';
import { LightbulbComponent } from './lightbulb/lightbulb.component';
import { ComputerComponent } from './computer/computer.component';
import { OverviewComponent } from './overview/overview.component';

import { ColorSwatchesModule } from 'ngx-color/swatches';
import { DiscoverComponent } from './discover/discover.component';
import { AddComponent } from './add/add.component';
import { RokuComponent } from './roku/roku.component';
import { RokuButtonComponent } from './roku/roku-button/roku-button.component';
import { TvComponent } from './tv/tv.component';
import { StripComponent } from './strip/strip.component';

@NgModule({
  declarations: [DeviceComponent, KeyboardComponent, PlugComponent, LightbulbComponent, ComputerComponent, OverviewComponent, DiscoverComponent, AddComponent, RokuComponent, RokuButtonComponent, TvComponent, StripComponent],
  imports: [
    CommonModule, 
    SharedModule, 
    DeviceRoutingModule,
    FontAwesomeModule,
    ColorSwatchesModule,
    FormsModule
  ]
})
export class DeviceModule {}
