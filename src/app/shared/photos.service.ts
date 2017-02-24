import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { LocationService } from './location.service';


const FLICKR_URL = environment.FLICKR_URL;
const FLICKR_API_KEY = environment.FLICKR_API_KEY;

@Injectable()
export class PhotosService {

  constructor(private http: Http, private location: LocationService) { }

  getPhotos() {
    return new Promise<any>((resolve, reject) => {
      this.getLocation().then(coords => {
        this.getPhotosAtLocation(coords).then(resolve);
      });
    });

    //return this.getLocation().then(this.getPhotosAtLocation);
  }

  private getLocation() {
    return this.location.getCurrentLocation();
  }

  private getPhotosAtLocation(coords: Coordinates) {
    let parameter_string = '?method=flickr.photos.search'
      + this.getQueryParameter('lat', coords.latitude)
      + this.getQueryParameter('lon', coords.longitude)
      + this.getQueryParameter('sort', 'interestingness-desc');
    return this.postToFlickr(parameter_string).then(res => {
      console.log("getPhotosAtLocation", res);
      return res;
    });
  }

  private postToFlickr(parameter_string) {
    let url = FLICKR_URL + parameter_string;
    url = this.addQueryParameter(url, 'api_key', FLICKR_API_KEY);
    url = this.addQueryParameter(url, 'format', 'json');


    let headers = new Headers({ 'content-type': 'multipart/form-data' });
    let ops = new RequestOptions({ headers: headers });

    return this.http.post(url, {}, ops).toPromise().then((res: any) => {
      let photos = {};
      let jsonFlickrApi = (response) => {
        console.log(
          "Got response from Flickr-API with the following photos: %o",
          response.photos
        )
        photos = response.photos;
      };
      let jsonResponse = res._body;
      eval("(" + jsonResponse + ")");
      return photos;
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
