
import { Component, Input, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MapService } from './map.service';


@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string;

  // lat: number = 51.678418;
  // lng: number = 7.809007;
  isPositionError: boolean = false;
  lat: number
  lng: number;

  constructor(private mapService: MapService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  getLocation(location) {
    this.mapService.getGeoLocation(location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;

        this.ref.detectChanges();
      }, () => {
        this.isPositionError = true;
      });
  }

  mapReadyHandler() {
    this.getLocation(this.location);
  }
}

