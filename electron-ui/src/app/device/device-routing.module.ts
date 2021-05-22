import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device.component';
import { KeyboardComponent } from "./keyboard/keyboard.component";
import { OverviewComponent } from "./overview/overview.component";
import { DiscoverComponent } from "./discover/discover.component";

const routes: Routes = [
  {
    path: 'devices/:id',
    component: DeviceComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'keyboard', component: KeyboardComponent }
    ]
  },
  {
    path: 'discover-devices',
    component: DiscoverComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule {}
