import { Component, inject } from '@angular/core';

import { SystemService } from '../../services/system.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'firma-footer',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  systemService = inject(SystemService);
}
