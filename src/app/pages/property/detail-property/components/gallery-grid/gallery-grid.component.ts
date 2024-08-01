import { Component, input, OnInit } from '@angular/core';
import { Employee, Property, PropertyGallery } from 'src/app/types';
import { PropertyTypePipe } from '../../../../../pipes/property-type.pipe';
import { DialogModule } from 'primeng/dialog';
import { GalleryListComponent } from '../gallery-list/gallery-list.component';
import { SendInfoFormComponent } from '../send-info-form/send-info-form.component';

@Component({
  selector: 'app-gallery-grid',
  standalone: true,
  imports: [
    PropertyTypePipe,
    DialogModule,
    GalleryListComponent,
    SendInfoFormComponent,
  ],
  templateUrl: './gallery-grid.component.html',
  styles: ``,
})
export class GalleryGridComponent implements OnInit{
  property = input.required<Property>();
  user = input<Employee>();
  isLink = input(false);
  images = input<PropertyGallery[]>([]);

  viewImages: PropertyGallery[] | any = [];

  openDetail = false;

  openInfo = false;

  ngOnInit(): void {
    if (this.images().length >= 3) {
      this.viewImages = [...this.images().slice(0, 3)];
    }
  }

  errorImage(index: number) {
    this.viewImages[index] = null;
  }
}
