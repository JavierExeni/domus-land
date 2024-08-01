import { NgIf } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { GoogleMap, MapCircle, MapMarker } from '@angular/google-maps';

import { Property } from '../../types/property.type';
import { USER_TYPE } from '../../types/user.type';

@Component({
  selector: 'app-public-map',
  standalone: true,
  imports: [GoogleMap, MapCircle, MapMarker, NgIf],
  templateUrl: './public-map.component.html',
  styles: ``,
})
export class PublicMapComponent {
  property = input<Property>();
  role = input<USER_TYPE>();

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    zIndex: 99999999,
  };

  markerPositions: google.maps.LatLngLiteral[] = [];

  center: google.maps.LatLngLiteral = {
    lat: -17.783370382228103,
    lng: -63.18211806075972,
  };
  currentPosition?: google.maps.LatLngLiteral;

  mapOptions: google.maps.MapOptions = {
    zoom: 15,
    gestureHandling: 'auto',
  };

  radius = 500;
  userType = USER_TYPE;

  constructor() {
    effect(() => {
      this.initMap();
    });
  }

  initMap() {
    if (this.property()) {
      this.center = {
        lat: Number(this.property()!.latitude),
        lng: Number(this.property()!.longitude),
      };
    }
  }
}
