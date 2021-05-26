import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { 
  faSpinner, 
  faLightbulb, 
  faPlug, 
  faKeyboard,
  faDesktop,
  faHdd,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { faRaspberryPi, faAmazon } from "@fortawesome/free-brands-svg-icons";
import { NodeApi } from "./../api/api.node";
import { Node } from "./../models/node";
import { Device } from "./../models/device"
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  node: Node;
  faSpinner = faSpinner;
  faLightbulb = faLightbulb;
  faPlug = faPlug;
  faKeyboard = faKeyboard;
  faDesktop = faDesktop;
  faPi = faRaspberryPi;
  faHdd = faHdd;
  faAmazon = faAmazon;
  faPlus = faPlus;
  isLoaded = false;
  loadError: any;

  constructor(
    private route: ActivatedRoute, 
    private nodeApi: NodeApi,
    private router: Router,
    private navbar: NavbarService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.nodeApi.get(params.id).subscribe({
        next: data => {
          this.node = data;
          this.isLoaded = true;
          this.loadError = null;
          this.navbar.set(['/home'], this.node.name)
        },
        error: err => {
          this.isLoaded = false;
          this.loadError = `${err.statusText}: ${err.error.message}`;
        }
      })
    });
  }

  getIcon(device: Device) {
    if (device.device_type === "BULB") {
      return this.faLightbulb;
    } else if (["PC", "LINUX"].includes(device.device_type)) {
      return this.faDesktop;
    } else if (device.device_type === "ROKU") {
      return this.faHdd;
    } else if (device.device_type === "AMZN") {
      return this.faAmazon;
    } else if (device.device_type === "PI") {
      return this.faPi;
    }

    return this.faPlug;
  }
}
