import { Subject } from 'rxjs';
import { Coordinate } from '../location/coordinate.model';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { LocationService } from '../location/location.service';

const FLICKR_URL = environment.FLICKR_URL;
const FLICKR_API_KEY = environment.FLICKR_API_KEY;

// Fallback position: Gothenburg city centre.
const gbgLocation = {
  'latitude': 57.708870,
  'longitude': 11.974560,
}

// Error strings
const locationError = 'Can not get your location, showing images from Gothenburg!';
const apiError = 'Can not reach the flickr service, try again later';

declare var XDomainRequest;


@Injectable()
export class PhotosService {

  private errorSubject = new Subject<string>();
  $error = this.errorSubject.asObservable();

  constructor(private http: Http, private location: LocationService) { }

  getPhotos() {
    return new Promise<any>((resolve, reject) => {
      this.getLocation().then(coords => {
        this.getPhotosAtLocation(coords).then(resolve);
      });
    });
  }

  private getLocation() {
    return this.location.getCurrentLocation().then(res => {
      return res;
    }, err => {
      // Can't get the user's location, show images from Gothenburg.
      this.errorSubject.next(locationError);
      return gbgLocation
    });
  }

  private getPhotosAtLocation(coords: Coordinate) {
    let parameter_string = '?method=flickr.photos.search'
      + this.getQueryParameter('lat', coords.latitude)
      + this.getQueryParameter('lon', coords.longitude)
      + this.getQueryParameter('sort', 'interestingness-desc');
    return this.postToFlickr(parameter_string);
  }

  private postToFlickr(parameter_string) {
    let url = FLICKR_URL + parameter_string;
    url = this.addQueryParameter(url, 'api_key', FLICKR_API_KEY);
    url = this.addQueryParameter(url, 'format', 'json');

    let headers = new Headers({ 'content-type': 'multipart/form-data' });
    let ops = new RequestOptions({ headers: headers });

    // if IE9, use XDomainRequest.
    if (window['XDomainRequest']) {
      return this.IEPostRequest(url);
    }

    return this.http.post(url, {}, ops).toPromise().then((res: any) => {
      return this.processPhotos(res._body);
    }, this.apiError);
  }

  // IE9 does not support standard XMLHttpRequest-objects to be sent to 
  // different domains, need to use XDomainRequest-objects instead. 
  private IEPostRequest(url, ) {
    return new Promise((resolve, reject) => {
      var xdr = new XDomainRequest();
      xdr.open("post", url);

      // Request failed.
      xdr.ontimeout = this.apiError;
      xdr.onerror = this.apiError;

      xdr.onload = () => {
        resolve(this.processPhotos(xdr.responseText));
      }

      setTimeout(() => {
        xdr.send();
      });
    });
  }

  // Turns data from the API into JSON.
  private processPhotos(jsonResponse) {
    let photos;
    let jsonFlickrApi = this.jsonFlickrApi;
    eval("(" + "photos =" + jsonResponse + ")");
    return photos;
  }

  private apiError = err => {
    this.errorSubject.next(apiError);
  };

  // This is the jsonp-function that the Flickr api sends.
  private jsonFlickrApi = (response) => {
    if (response.stat === 'fail') {
      this.errorSubject.next(apiError);
    }
    //photos = response.photos;
    return response.photos;
  };

  // Functions to prepare the url that is sent to the api.
  private addQueryParameter(url, parameter_name, value) {
    return url + this.getQueryParameter(parameter_name, value);
  }

  private getQueryParameter(parameter_name, value) {
    return '&' + parameter_name + '=' + value;
  }

}
