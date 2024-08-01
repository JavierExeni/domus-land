import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '@services/alert.service';
import { ContactService } from '@services/contact.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  ContactRequest,
  getPropertyCategories,
  getPropertyTypes,
} from 'src/app/types';

@Component({
  selector: 'app-contact-sell-property-form',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    FloatLabelModule,
    DropdownModule,
  ],
  templateUrl: './contact-sell-property-form.component.html',
  styles: ``,
})
export class ContactSellPropertyFormComponent {
  fb = inject(FormBuilder);
  contactService = inject(ContactService);
  alertService = inject(AlertService);

  formContactSell: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [null, Validators.required],
    message: ['', Validators.required],
    contact_type: [1],
    property_type: [null, Validators.required],
    property_category: [null, Validators.required],
  });

  propertyCategoryOptions = getPropertyCategories();

  propertyTypeOptions = getPropertyTypes();

  onSubmit() {
    const request: ContactRequest = this.formContactSell.getRawValue();
    console.log(request);

    if (
      request.name.trim() === '' ||
      request.message.toString().trim() === ''
    ) {
      this.alertService.alertNotification(
        'error',
        '¡Formulario invalido!',
        'Por favor, rellene los campos correctamente.'
      );
      return;
    }

    this.alertService.loader();
    this.onCreate(request);
  }

  onCreate(request: ContactRequest) {
    this.contactService.createContact(request).subscribe(
      (response) => {
        this.alertService.alertNotification(
          'success',
          '¡Registrado exitosamente!',
          'Se ha registrado el contacto con exito.'
        );
        this.formContactSell.reset();
        this.formContactSell.get('contact_type')?.setValue(1);
      },
      (error) => {
        this.alertService.alertNotification(
          'error',
          '¡Hubo un problema!',
          'Error al registrar el contacto.'
        );
      }
    );
  }
}
