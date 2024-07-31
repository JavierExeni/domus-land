import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '@services/alert.service';
import { ContactService } from '@services/contact.service';

import { ContactRequest } from 'src/app/types';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    FloatLabelModule
  ],
  templateUrl: './contact-form.component.html',
  styles: ``,
})
export class ContactFormComponent {
  fb = inject(FormBuilder);
  contactService = inject(ContactService);
  alertService = inject(AlertService);

  formContact: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [null, Validators.required],
    message: ['', Validators.required],
    contact_type: [0],
    property_type: [null],
    property_category: [null],
  });

  onSubmit() {
    const request: ContactRequest = this.formContact.getRawValue();
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
    this.onCreate(request);
  }

  onCreate(request: ContactRequest) {
    this.alertService.loader();
    this.contactService.createContact(request).subscribe({
      next: () => {
        this.alertService.alertNotification(
          'success',
          '¡Registrado exitosamente!',
          'Se ha registrado el contacto con exito.'
        );
        this.formContact.reset();
        this.formContact.get('contact_type')?.setValue(0);
      },
      error: () => {
        this.alertService.alertNotification(
          'error',
          '¡Hubo un problema!',
          'Error al registrar el contacto.'
        );
      },
    });
  }
}
