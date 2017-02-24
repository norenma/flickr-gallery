import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

  constructor() {

  }

  /**
   * The the user's current location. 
   */
  getCurrentLocation(): Promise<Coordinates> {
    return new Promise<Coordinates>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position.coords);
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
