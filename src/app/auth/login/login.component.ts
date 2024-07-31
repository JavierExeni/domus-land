import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { LoginRequest } from 'src/app/types/auth.type';
import { AuthService } from '../auth.service';

import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    JsonPipe,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
  ],
  templateUrl: './login.component.html',
  styles: ``,
  providers: [MessagesModule],
})
export class LoginComponent {
  private _fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form = this._fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  invalid = false;

  messages: Message[] | undefined;

  private usernameSubscription: Subscription | undefined;

  ngOnInit() {
    this.usernameSubscription = this.form
      .get('username')!
      .valueChanges.subscribe((value) => {
        const lowercaseValue = value.toLowerCase();
        if (value !== lowercaseValue) {
          this.form
            .get('username')
            ?.setValue(lowercaseValue, { emitEvent: false });
        }
      });
  }

  onSubmit() {
    this.invalid = false;
    const request: LoginRequest = this.form.getRawValue();
    this.authService.login(request).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.invalid = true;
        this.messages = [{ severity: 'error', detail: 'Credenciales incorrectas' }];
        this.authService.changeLoadingState(false);
        this.form.enable();
      },
    });
  }

  ngOnDestroy() {
    this.usernameSubscription?.unsubscribe();
  }
}
