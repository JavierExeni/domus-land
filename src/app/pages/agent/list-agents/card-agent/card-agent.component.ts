import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee } from 'src/app/types';

@Component({
  selector: 'app-card-agent',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './card-agent.component.html',
  styles: ``
})
export class CardAgentComponent {
  item = input.required<Employee>();
}
