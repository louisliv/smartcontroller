import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import { NavbarVars, NavbarService } from "./navbar.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  vars: NavbarVars;
  faBack = faArrowLeft;
  faHome = faHome;
  faCog = faCog;

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.get().subscribe({
      next: data => {
        this.vars = data;
      }
    })
  }

}
