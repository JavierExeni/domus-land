import { Component, inject, input } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { DecimalPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

import { Property, PROPERTY_CATEGORY } from 'src/app/types';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PropertyTypePipe } from '../../../../../pipes/property-type.pipe';
import { PropertyCategoryPipe } from '../../../../../pipes/property-category.pipe';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [
    NgIf,
    PropertyTypePipe,
    PropertyCategoryPipe,
    DecimalPipe,
    NgOptimizedImage,
    ButtonModule,
    RouterModule,
    ClipboardModule,
    ToastModule,
  ],
  templateUrl: './property-card.component.html',
  styles: ``,
  providers: [MessageService],
})
export class PropertyCardComponent {
  property = input.required<Property>();

  authService = inject(AuthService);
  metaService = inject(Meta);
  clipboard = inject(Clipboard);
  messageService = inject(MessageService);
  router = inject(Router);

  PROPERTY_CATEGORY = PROPERTY_CATEGORY;

  ROLE = this.authService.isLoggedIn();

  share(social: string) {
    const link = encodeURI(
      `${window.location.origin}/propiedades/${this.property().id}`
    );
    let title = encodeURIComponent('Mira esta propiedad de Firma Propiedades:');
    const imageUrl = this.property().banner;
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({ property: 'og:url', content: link });
    switch (social) {
      case 'facebook':
        const href_fb = `https://www.facebook.com/share.php?u=${link}`;
        window.open(href_fb, '_blank');
        break;
      case 'whatsapp':
        if (this.authService.currentLoggedUser()) {
          this.copyPathName();
        } else {
          title = 'Me interesa esta propiedad de Firma Propiedades:'
          const href_wsp = `https://api.whatsapp.com/send?phone=591${this.property().created_by.phone}&text=${title}%0A%0A${link}`;
          window.open(href_wsp, '_blank');
        }
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
      `${window.location.origin}/propiedades/${this.property().id}`
    );
  }
}
