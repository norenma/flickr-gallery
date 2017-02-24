import { Photo } from '../shared/photo.model';
import { HostListener, Component, OnInit } from '@angular/core';

import { PhotosService } from '../shared/photos.service';
import { HttpModule } from '@angular/http';



@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  photos: Array<Photo> = [];
  currentDetail: Photo = null;
  imagesLoaded = 20;

  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.photosService.getPhotos().then(res => {
      res.photo.forEach(data => {
        let photo = new Photo();
        photo.setUrls(data.farm, data.server, data.id, data.secret);
        this.photos.push(photo);
      });
    });
  }

  showDetail(photo: Photo) {
    this.currentDetail = photo;
  }

  closeDetail() {
    this.currentDetail = null;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      this.imagesLoaded += 20;
    }
  }

}
