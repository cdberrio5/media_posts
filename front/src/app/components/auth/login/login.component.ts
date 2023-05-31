import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { enviroment } from './../../../../environments/enviroment';

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

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

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

    this.validateUser();
  }

  login() {
    if(this.loginForm.invalid) {
      return;
    }

    const user = {
      email: this.loginForm.controls["email"].value,
      password: this.loginForm.controls["password"].value
    }

    this.http.post<any>(enviroment.ApiUrlUser + "login", user).subscribe((res) => {
      localStorage.setItem("secret-key", res.token);
      localStorage.setItem("name", res.name);

      this.router.navigate(["/home"]);
    })
  }

  showPassword(change: boolean, type: string) {
    this.showPass = change;
    this.password.nativeElement.type = type;   
  }

  validateUser() {
    if(localStorage.getItem("secret-key")) {
      this.router.navigate(["/home"]);
    }
  }
}
