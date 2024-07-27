import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-list-message',
  standalone: true,
  imports: [],
  templateUrl: './empty-list-message.component.html',
  styles: ``,
})
export class EmptyListMessageComponent {
  text = input('');
}
