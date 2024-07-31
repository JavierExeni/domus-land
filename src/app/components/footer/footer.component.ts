import { Component, inject } from '@angular/core';

import { SystemService } from '../../services/system.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'firma-footer',
  standalone: true,
  imports: [RouterLink, NgIf, ContactFormComponent, DialogModule],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  systemService = inject(SystemService);

  contactFormVisible = false;
}
