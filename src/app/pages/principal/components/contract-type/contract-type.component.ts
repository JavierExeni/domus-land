import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROPERTY_TYPE } from 'src/app/types';

@Component({
  selector: 'app-contract-type',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contract-type.component.html',
  styles: ``
})
export class ContractTypeComponent {
  PROPERTY_TYPE = PROPERTY_TYPE;
}
