import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  @ViewChild('password') password!: ElementRef;

  loginForm!: FormGroup;
  faeye = faEye;
  faeyeslash = faEyeSlash;
  auth: boolean = true;
  showPass: boolean = false;

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

  showPassword(change: boolean, type: string) {
    this.showPass = change;
    this.password.nativeElement.type = type;   
  }
}
