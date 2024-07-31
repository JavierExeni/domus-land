import {
  afterNextRender,
  afterRender,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

import { PropertyService } from '@services/property.service';
import { UserService } from '@services/user.service';
import { AlertService } from '@services/alert.service';
import {
  Employee,
  getPropertyStateById,
  Property,
  PROPERTY_STATE,
  PropertyGallery,
  USER_TYPE,
} from 'src/app/types';

import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

import { SendInfoFormComponent } from './components/send-info-form/send-info-form.component';
import { GalleryGridComponent } from './components/gallery-grid/gallery-grid.component';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-detail-property',
  standalone: true,
  imports: [
    CommonModule,
    ImageModule,
    DialogModule,
    SkeletonModule,
    GalleryGridComponent,
    SendInfoFormComponent,
    ClipboardModule,
    ToastModule,
    ButtonModule,
  ],
  templateUrl: './detail-property.component.html',
  styles: ``,
  providers: [MessageService],
})
export class DetailPropertyComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  alertService = inject(AlertService);
  clipboard = inject(Clipboard);
  propertyService = inject(PropertyService);
  messageService = inject(MessageService);
  metaService = inject(Meta);
  titleService = inject(Title);
  userService = inject(UserService);

  userType = USER_TYPE;

  mapModal = false;
  isLink = false;

  images: PropertyGallery[] = [];

  propertyId = 0;
  isLoggedIn = false;

  selectedProperty: Property | undefined;

  property: Property | undefined;
  agent: Employee | undefined;

  constructor() {
    this.activatedRoute.data.subscribe(({ property, user }) => {
      if (user) this.agent = user;
      this.property = property;
      const images = property.gallery?.filter((el: any) => !el.is_banner);
      const banner = property.gallery?.find((el: any) => el.is_banner);
      this.images = banner ? [banner, ...images!] : [...images!];
      afterNextRender(() => {
        this.updateMetaTags(property, banner!);
      });
    });
  }

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(({ property }) => {
    //   this.property = property;
    //   const images = property.gallery?.filter((el: any) => !el.is_banner);
    //   const banner = property.gallery?.find((el: any) => el.is_banner);
    //   this.images = banner ? [banner, ...images!] : [...images!];
    //   console.log(property);
    //   this.updateMetaTags(property, banner!);
    // });
  }

  updateMetaTags(property: Property, banner: PropertyGallery) {
    this.titleService.setTitle(property.property_title);

    const imageUrl = banner.file_watermark
      ? banner.file_watermark
      : 'default-image-url.jpg';
    this.metaService.updateTag({
      property: 'og:title',
      content: property.property_title,
    });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({
      property: 'og:url',
      content: window.location.href,
    });
  }

  updateEstate(state: PROPERTY_STATE, property: Property) {
    this.alertService
      .alertConfirmation(
        `¿Estás seguro de cambiar de estado esta propiedad a ${getPropertyStateById(
          state
        )}?`,
        'Puedes revertir esta acción cuando quieras.',
        `Eliminar`
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.propertyService
            .updateProperty(property.id, { property_state: state })
            .subscribe({
              next: () => {
                this.alertService.alertNotification(
                  'success',
                  '¡Propiedad eliminada!',
                  'Se ha cambiado eliminado con exito.'
                );
              },
              error: (e) => {
                console.log(e);
                this.alertService.alertNotification(
                  'error',
                  '¡Hubo un problema!',
                  'Error al cambiar de estado la propiedad.'
                );
              },
              complete: () => {
                // Actualizar la propiedad
              },
            });
        }
      });
  }

  shareProperty() {
    this.messageService.add({
      severity: 'success',
      summary: '¡Copiado!',
      detail: 'Link copiado',
    });

    // let user: ICurrentUser = this.authService.currentLoggedUser!;

    // this.clipboard
    //   .copy
    //   // `${window.location.origin}/propiedades/${this.propertyId}/${user.id}`
    //   ();
  }

  share(social: string) {
    const link = encodeURI(
      `${window.location.origin}/propiedades/${this.selectedProperty?.id}`
    );
    const title = encodeURIComponent(
      'Mira esta propiedad de Firma Propiedades:'
    );
    const imageUrl = this.selectedProperty?.banner;
    this.metaService.updateTag({ property: 'og:image', content: imageUrl! });
    this.metaService.updateTag({ property: 'og:url', content: link });
    switch (social) {
      case 'facebook':
        const href_fb = `https://www.facebook.com/share.php?u=${link}`;
        window.open(href_fb, '_blank');
        break;
      case 'whatsapp':
        // if (this.authService.currentLoggedUser) {
        //   this.copyPathName();
        // } else {
        //   const href_wsp = `https://api.whatsapp.com/send?phone=591${this.selectedProperty?.created_by.phone}&text=${title}%0A%0A${link}`;
        //   window.open(href_wsp, '_blank');
        // }
        break;
      case 'linkedin':
        const href_link = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;
        window.open(href_link, '_blank');
        break;
    }
  }

  copyPathName() {
    this.messageService.add({
      severity: 'success',
      summary: '¡Copiado!',
      detail: 'Link para WhatsApp copiado',
    });

    this.clipboard.copy(
      `${window.location.origin}/propiedades/${this.selectedProperty?.id}`
    );
  }

  ngOnDestroy(): void {
    this.titleService.setTitle('Firma Propiedades');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Venta, Alquiler, Anticrético de Casas, Departamentos, Terrenos, Locales comerciales, Oficinas / Contamos con más de 1.000 propiedades en Bolivia',
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'Firma Propiedades - La llave para tu futuro',
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'Firma Propiedades',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Firma Propiedades',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Venta, Alquiler, Anticrético de Casas, Departamentos, Terrenos, Locales comerciales, Oficinas / Contamos con más de 1.000 propiedades en Bolivia',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content:
        'https://webmedia.firmacdn.com/domus/public/system/logo/logo.png',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://firmacasas.com//',
    });
  }
}
