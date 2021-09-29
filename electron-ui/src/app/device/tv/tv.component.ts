import { Component, Input, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DeviceApi } from '../../api/api.device';
import { Device } from '../../models/device';
import { TVButtons } from '../device.globals';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  @Input() device: Device;
  registered: boolean = false;
  isLoaded: boolean = false;
  faSpinner = faSpinner;
  tvButtons = TVButtons;
  sources: any[];
  selectedSource: string;

  constructor(private deviceApi: DeviceApi) { }

  ngOnInit(): void {
    this.deviceApi.registered(this.device.id).subscribe({
      next: response => {
        const registered = response['registered']
        this.isLoaded = true
        if (!registered) {
          this.deviceApi.register(this.device.id).subscribe({
            next: res => {
              this.registered = true;
              this.getSources();
            }
          })
        } else {
          this.registered = true;
          this.getSources()
        }
      }
    })
  }

  getSources(): void {
    this.deviceApi.sources(this.device.id).subscribe({
      next: response => {
        this.sources = response['sources'];
        this.selectedSource = response['current_source']
      }
    })
  }

  onChange(event: Event): void {
    const sourceId: string = (event.target as HTMLInputElement).value
    if (sourceId) {
      this.deviceApi.setSource(this.device.id, sourceId).subscribe()
    }
  }
}
