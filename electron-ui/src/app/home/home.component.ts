import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeApi } from "./../api/api.node";
import { Node } from "./../models/node";
import { faSpinner, faServer, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from "../navbar/navbar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  nodes: Node[];
  faSpinner = faSpinner;
  faNetworkWired = faServer;
  faPlus = faPlus;
  isLoaded = false;
  loadError: any;

  constructor(
    private router: Router, 
    private nodeApi: NodeApi,
    private navbarService: NavbarService
  ) { }

  ngOnInit(): void { 
    this.navbarService.set([], 'SmartController')
    this.nodeApi.getAll().subscribe({
      next: data => {
        this.nodes = data;
        this.isLoaded = true;
        this.loadError = null;
      },
      error: err => {
        this.isLoaded = false;
        this.loadError = `${err.statusText}: ${err.error.message}`;
      }
    })
  }

}
