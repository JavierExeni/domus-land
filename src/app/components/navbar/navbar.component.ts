import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, SidebarModule, DialogModule, DropdownModule],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {

  sidebarVisible = false;

  openSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
