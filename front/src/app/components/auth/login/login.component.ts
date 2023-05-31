import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm!: FormGroup;

  auth: boolean = true;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
       email: ['', Validators.compose([
        Validators.required,
        Validators.email,
       ])],
       password: ['', Validators.compose([
        Validators.required,
        Validators.min(8),
       ])]
    });    
  }

  login() {
    if(this.loginForm.invalid) {
      return;
    }

    alert("Enviado");
  }
}
