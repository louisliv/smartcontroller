import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import { NavbarVars, NavbarService } from "./navbar.service";
import { ElectronService } from '../core/services';

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
  showClose = false;
  settingsOpen = false;

  constructor(
    private navbarService: NavbarService,
    private electronService: ElectronService
  ) {
    this.showClose = this.electronService.isElectron
  }

  ngOnInit(): void {
    this.navbarService.get().subscribe({
      next: data => {
        this.vars = data;
      }
    })
  }

  closeApp(): void {
    if (this.showClose) {
      this.electronService.ipcRenderer.send('app-close')
    }
  }

  toggleSettingsDropdown(): void {
    this.settingsOpen = !this.settingsOpen;
  }
}
