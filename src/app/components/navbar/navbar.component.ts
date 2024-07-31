import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { ContactSellPropertyFormComponent } from '../contact-sell-property-form/contact-sell-property-form.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { LoginComponent } from '../../auth/login/login.component';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    RouterLink,
    SidebarModule,
    DialogModule,
    DropdownModule,
    ContactSellPropertyFormComponent,
    ContactFormComponent,
    LoginComponent,
  ],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  authService = inject(AuthService);

  sidebarVisible = false;
  sellPropertyVisible = false;
  contactFormVisible = false;
  loginVisible = false;

  openSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout() {
    this.authService.logout();
  }
}
