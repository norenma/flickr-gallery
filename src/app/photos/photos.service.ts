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
      console.log("got location");
      return res;
    }, err => {
      console.log("error");
      this.errorSubject.next(locationError);
      return gbgLocation
    });
  }

  private getPhotosAtLocation(coords: Coordinate) {
    console.log('#getPhotosAtLocation');

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

    console.log("postToFlickr");

    let headers = new Headers({ 'content-type': 'multipart/form-data' });
    let ops = new RequestOptions({ headers: headers });


    if (window['XDomainRequest']) {
      var xdr = new XDomainRequest();

      xdr.open("get", "http://example.com/api/method");

      xdr.onprogress = function () {
        //Progress
        console.log("progg");
        
      };

      xdr.ontimeout = function () {
        //Timeout
      };

      xdr.onerror = function () {
        //Error Occured
        console.log("errrr");
        
      };

      xdr.onload = function () {
        //success(xdr.responseText);
        console.log((xdr.responseText));

      }

      setTimeout(function () {
        xdr.send();
      }, 0);
    }


    return this.http.post(url, {}, ops).toPromise().then((res: any) => {
      console.log("res", res);

      let photos = {};
      let jsonFlickrApi = (response) => {
        if (response.stat === 'fail') {
          console.log("state fail");

          this.errorSubject.next(apiError);
        }
        photos = response.photos;
      };
      let jsonResponse = res._body;
      eval("(" + jsonResponse + ")");
      return photos;
    }, err => {
      console.log("err", err);

      this.errorSubject.next(apiError);
    });
  }

  private addQueryParameter(url, parameter_name, value) {
    return url + this.getQueryParameter(parameter_name, value);
  }

  private getQueryParameter(parameter_name, value) {
    return '&' + parameter_name + '=' + value;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  public jsonFlickrApi(response) {
    console.log(
      "Got response from Flickr-API with the following photos: %o",
      response.photos
    );
    // Handle the response here. I.E update the DOM, trigger event handlers etc.
  }



}
