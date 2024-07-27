import { Component, HostListener, inject, input } from '@angular/core';
import { PropertyGalleryService } from '@services/property-gallery.service';

import { Property, PropertyGallery, USER_TYPE } from 'src/app/types';

import * as FileSaver from 'file-saver';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-gallery-list',
  standalone: true,
  imports: [CommonModule, ImageModule, ButtonModule, GalleriaModule],
  templateUrl: './gallery-list.component.html',
  styles: ``
})
export class GalleryListComponent {
  @HostListener('window:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.displayGallery = false;
  }

  images = input.required<PropertyGallery[] | any>();
  property = input.required<Property>();

  // authService = inject(AuthService);
  propertyGalleryService = inject(PropertyGalleryService);

  displayGallery = false;

  USER_TYPE = USER_TYPE;

  activeIndex = 0;

  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  errorImage(index: number) {
    this.images()[index] = null;
  }

  downloadSingleWater(image: PropertyGallery) {
    this.propertyGalleryService
      .downloadSingleWaterMarkImage(image.id)
      .subscribe((res) => {
        FileSaver.saveAs(
          res,
          `watermark-${image.id}-${image.property}-image.jpg`
        );
      });
  }

  downloadSingleOriginal(image: PropertyGallery) {
    this.propertyGalleryService
      .downloadSingleOriginalImage(image.id)
      .subscribe((res) => {
        FileSaver.saveAs(
          res,
          `original-${image.id}-${image.property}-image.jpg`
        );
      });
  }

  downloadBulk() {
    this.propertyGalleryService
      .downloadbulkImages(this.property().id)
      .subscribe((res) => {
        FileSaver.saveAs(res, `bulk-images-${this.property().id}.zip`);
      });
  }
}
