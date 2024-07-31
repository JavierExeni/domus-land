import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Employee } from 'src/app/types';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './profile-card.component.html',
  styles: ``
})
export class ProfileCardComponent {
  data = input.required<Employee>();
}
