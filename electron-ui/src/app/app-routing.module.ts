import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { NodeRoutingModule } from "./node/node-routing.module";
import { DeviceRoutingModule } from "./device/device-routing.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    NodeRoutingModule,
    DeviceRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
