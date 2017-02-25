import { LocationService } from './location/location.service';
import { PhotosService } from './photos/photos.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XSRFStrategy } from '@angular/http';



import { AppComponent } from './app.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';


export class NoXSRFStrategy {
  configureRequest(req) {
    // Remove `x-xsrf-token` from request headers
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PhotoGalleryComponent,
    PhotoDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PhotosService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
