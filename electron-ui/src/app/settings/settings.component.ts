import { Component, OnInit } from '@angular/core';
import { Setting } from '../models/setting';
import { LocalStorageService } from '../shared/services/localStorage.service';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Setting[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private navbar: NavbarService
  ) { }

  ngOnInit() {
    this.navbar.set(["/home"], "Settings")
    this.getSettings();
  }

  getSettings() {
    this.localStorage.settingsList.forEach(settingKey => {
      let setting = new Setting();
      setting.name = settingKey;
      setting.value = this.localStorage.get(settingKey);
      
      this.settings.push(setting);
    });
  }

  setSettings() {
    this.settings.forEach(setting => {
      this.localStorage.set(setting.name, setting.value)
    })
  }
}
