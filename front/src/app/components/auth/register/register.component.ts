import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.registerForm = this.fb.group({
        fullName: ['', Validators.compose([
          Validators.required,
          Validators.pattern('/[^a-zA-Z\s]+/')
        ])],
        email: ['', Validators.compose([
          Validators.required,
          Validators.email,
        ])],
        password: ['', Validators.compose([
          Validators.required,
          Validators.min(8),
        ])],
        confirmPassword: ['', Validators.compose([
          Validators.required
        ])]
    }, {
      validators: this.validatePasswords.bind(this)
    });
  }

  register() {
    if(this.registerForm.invalid) {
      return;
    }

    alert("Enviado");
  }

  validatePasswords(formGroup: FormGroup) {
    const password = formGroup.get("password")?.value;
    const confirmPassword = formGroup.get("confirmPassword")?.value

    return password == confirmPassword ? null : { passwordNotMatch: true };
  }
}
