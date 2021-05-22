import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [DeviceComponent, KeyboardComponent, PlugComponent, LightbulbComponent, ComputerComponent, OverviewComponent, DiscoverComponent],
  imports: [
    CommonModule, 
    SharedModule, 
    DeviceRoutingModule,
    FontAwesomeModule,
    ColorSwatchesModule
  ]
})
export class DeviceModule {}
