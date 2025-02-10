import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore, LoginState } from '../auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    ReactiveFormsModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected form!: FormGroup
  protected readonly auth = inject(AuthStore)

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      keepMeLoggedIn: [false, Validators.required]
    })
  }
  
  protected onSubmit() {
    this.auth.submit(this.form.value)
  }
  protected get login(): LoginState {
    return this.auth.login()
  }
}