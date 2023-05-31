import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required]
    });    
  }

  login() {
    if(this.loginForm.invalid) {
      return;
    }

    alert("Enviado");
  }
}
