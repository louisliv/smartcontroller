import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Node } from '../models/node';
import { NodeApi } from "../api/api.node";
import { Device } from '../models/device';

export class NavbarVars {
  backRoute: string[];
  title: string;
  params: {};
  node: Node;
  device: Device;
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  vars: NavbarVars;

  constructor(private nodeApi: NodeApi) {
    this.vars = new NavbarVars();
  }

  get(): Observable<NavbarVars> {
    return of(this.vars);
  }

  set(backRoute: string[], title: string, params: {} = null, device: Device = null) {
    this.vars.backRoute = backRoute;
    this.vars.title = title;
    this.vars.params = params;
    if (device?.node && device.node != this.vars.node?.id) {
      this.vars.device = device;
      this.nodeApi.get(device.node).subscribe({
        next: response => {
          this.vars.node = response
        }
      })
    } else if (device?.node == this.vars.node?.id) {
      this.vars.device = device
    } else {
      this.vars.node = null
      this.vars.device = null
    }
  }
}
