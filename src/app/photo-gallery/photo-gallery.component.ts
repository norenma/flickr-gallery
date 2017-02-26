import { HostListener, Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';

import { PhotosService } from '../photos/photos.service';
import { Photo } from '../photos/photo.model';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  private photos: Array<Photo> = [];
  private currentDetail: Photo = null;
  private imagesLoaded = 20;

  private loading = false;
  private error = false;
  private errorText = "";

  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.photosService.$error.subscribe(this.showError);
    this.getImages();
  }

  private getImages() {
    this.showLoading();
    this.photosService.getPhotos().then(res => {
      this.createPhotos(res);
      this.hideLoading();
    });
  }

  private createPhotos(data) {
    if (data) {
      data.photo.forEach(data => {
        let photo = new Photo();
        photo.setUrls(data.farm, data.server, data.id, data.secret);
        this.photos.push(photo);
      });
    }
  }

  private showLoading() {
    this.loading = true;
  }

  private hideLoading() {
    this.loading = false;
  }

  private showError = error => {
    this.errorText = error;
    this.error = true;
  }

  private showDetail(photo: Photo) {
    this.currentDetail = photo;
  }

  private closeDetail() {
    this.currentDetail = null;
  }

  // Detects when user has scrolled to the end of the page, template will load more images. 
  @HostListener('window:scroll', ['$event'])
  private onScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      this.imagesLoaded += 20;
    }
  }

}
