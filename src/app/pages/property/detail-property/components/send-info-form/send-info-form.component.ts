import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '@services/alert.service';
import { ContactService } from '@services/contact.service';
import { PropertyService } from '@services/property.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ContactRequest, Employee, getPropertyStateById, Property, PROPERTY_STATE, USER_TYPE } from 'src/app/types';

@Component({
  selector: 'app-send-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, DialogModule, ButtonModule
  ],
  templateUrl: './send-info-form.component.html',
  styles: ``,
})
export class SendInfoFormComponent {
  user = input.required<Employee>();
  property = input.required<Property>();
  isLink = input(false);
  showButtons = input(false);

  fb = inject(FormBuilder);
  contactService = inject(ContactService);
  alertService = inject(AlertService);

  // authService = inject(AuthService);
  propertyService = inject(PropertyService);

  editModal = false;
  userType = USER_TYPE;
  propertyState = PROPERTY_STATE;

  // ROLE = this.authService.currentLoggedUser
  //   ? this.authService.currentLoggedUser.role
  //   : null;
  ROLE = null;

  // contactType = this.authService.currentLoggedUser ? 2 : 0;
  contactType = 0;

  get CURRENT_AGENT_ID(): number | null {
    return null;
  }
  // get CURRENT_AGENT_ID(): number | null {
  //   return this.authService.currentLoggedUser?.role === USER_TYPE.ADMIN
  //     ? null
  //     : this.authService.currentLoggedUser!.id;
  // }

  formContact: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [null, Validators.required],
    message: ['', Validators.required],
    contact_type: [null],
    property_type: [null],
    property_category: [null],
    agent: [null],
    property_id: [null],
  });

  ngOnInit(): void {
    this.formContact.get('contact_type')?.setValue(this.contactType);
    this.formContact.get('property_id')?.setValue(this.property().id);
    if (this.isLink() || this.ROLE) {
      this.formContact.get('agent')?.setValue(this.user().id);
    }
  }

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
        this.formContact.get('contact_type')?.setValue(this.contactType);
        this.formContact.get('property_id')?.setValue(this.property().id);
        if (this.isLink() || this.ROLE) {
          this.formContact.get('agent')?.setValue(this.user().id);
        }
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

  updateEstate(state: PROPERTY_STATE, property: Property) {
    this.alertService
      .alertConfirmation(
        `¿Estás seguro de cambiar de estado esta propiedad a ${getPropertyStateById(
          state
        )}?`,
        'Puedes revertir esta acción cuando quieras.',
        `Eliminar`
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.propertyService
            .updateProperty(property.id, { property_state: state })
            .subscribe({
              next: () => {
                this.alertService.alertNotification(
                  'success',
                  '¡Propiedad eliminada!',
                  'Se ha cambiado eliminado con exito.'
                );
              },
              error: (e) => {
                console.log(e);
                this.alertService.alertNotification(
                  'error',
                  '¡Hubo un problema!',
                  'Error al cambiar de estado la propiedad.'
                );
              },
              complete: () => {
                // Actualizar la propiedad
              },
            });
        }
      });
  }

  sendWhatsapp() {
    const link = encodeURI(
      `${window.location.origin}/propiedades/${this.property().id}`
    );
    const title = encodeURIComponent(
      'Quiero mas información sobre esta propiedad:'
    );
    let url = `https://api.whatsapp.com/send?phone=591${this.user().phone}&text=${title}%0A%0A${link}`;
    window.open(url, '_blank');
  }
}
