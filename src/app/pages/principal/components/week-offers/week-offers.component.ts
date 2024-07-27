import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { EmptyListMessageComponent } from 'src/app/components/empty-list-message/empty-list-message.component';

@Component({
  selector: 'app-week-offers',
  standalone: true,
  imports: [EmptyListMessageComponent, NgIf],
  templateUrl: './week-offers.component.html',
  styles: ``
})
export class WeekOffersComponent {
  properties = [];
}
