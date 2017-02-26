import {Coordinate} from './coordinate.model';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

  constructor() {

  }

  /**
   * The the user's current location. 
   */
  getCurrentLocation(): Promise<Coordinate> {
    return new Promise<Coordinate>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        let coords = new Coordinate();
        coords.latitude = position.coords.latitude;
        coords.longitude = position.coords.longitude;
        resolve(coords);
      }, err => {
        console.log("Can't get users location", err);
        reject("Cant get users location");
        }, {
          maximumAge: 1000 * 60 * 1000,
          enableHighAccuracy: false
        });
    });
  }

}
