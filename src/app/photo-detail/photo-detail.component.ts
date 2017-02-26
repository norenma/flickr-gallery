import { Photo } from '../photos/photo.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  @Input() photo: Photo;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.close.emit();
  }

}
