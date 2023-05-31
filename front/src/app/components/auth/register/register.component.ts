import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { enviroment } from './../../../../environments/enviroment';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  @ViewChild('password') password!: ElementRef;
  @ViewChild('confirmPassword') confirmPassword!: ElementRef;

  registerForm!: FormGroup;

  faeye = faEye;
  faeyeslash = faEyeSlash;
  auth: boolean = true;
  showPass: boolean = false;
  showConfirmPass: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.registerForm = this.fb.group({
        fullName: ['', Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/)
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

    const user = {
      email: this.registerForm.controls["email"].value,
      password: this.registerForm.controls["password"].value,
      confirmPassword: this.registerForm.controls["confirmPassword"].value,
      fullName: this.registerForm.controls["fullName"].value,
    }

    this.http.post<any>(enviroment.ApiUrlUser + "register", user).subscribe((res) => {
      localStorage.setItem("secret-key", res.token);
      localStorage.setItem("name", res.name);

      this.router.navigate(["/home"]);
    })
  }

  validatePasswords(formGroup: FormGroup) {
    const password = formGroup.get("password")?.value;
    const confirmPassword = formGroup.get("confirmPassword")?.value

    return password == confirmPassword ? null : { passwordNotMatch: true };
  }

  showPassword(change: boolean, type: string) {
    this.showPass = change;
    this.password.nativeElement.type = type;   
  }

  showConfirmPassword(change: boolean, type: string) {
    this.showConfirmPass = change;
    this.confirmPassword.nativeElement.type = type;    
  }
}
