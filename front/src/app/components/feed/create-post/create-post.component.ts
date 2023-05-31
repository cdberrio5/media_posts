import { Component } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { enviroment } from './../../../../environments/enviroment';

import swal from 'sweetalert2';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent {
  postForm!: FormGroup;

  title: string = "Your post title";
  description: string = "Create message for share with yor friends";
  now: Date = new Date();
  name: any = "";

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
   }); 

   this.name = localStorage.getItem("name");
  } 

  createPost() {
    if(this.postForm.invalid) {
      return;
    }

    const post = {
      title: this.title,
      description: this.description,
    }
    
    const Authorization = localStorage.getItem("secret-key")

    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Authorization': Authorization ? Authorization : ""
      })
    }

    this.http.post<any>(enviroment.ApiUrlPost + "create", post, httpOptions).subscribe((res) => {
      this.swalSuccess();
    }, err => {
      this.swalError();
    })
  }

  swalSuccess() {
    swal.fire({
      iconHtml: '<img src="/assets/icons/success.png">',
      titleText: "Post Created",
      confirmButtonText: "OK",
      customClass: {
        icon: 'no-border',
        title: 'text-swal',
        confirmButton: 'swal-confirm-button'
      }
    });
  }

  swalError() {
    swal.fire({
      iconHtml: '<img src="/assets/icons/error.png">',
      titleText: "Uppss Try Later",
      confirmButtonText: "OK",
      customClass: {
        icon: 'no-border',
        title: 'text-swal',
        confirmButton: 'swal-confirm-button'
      }
    })
  }

  titleSet(input: any) {
    this.title = input.target.value;
  }

  msgSet(input: any) {
    this.description = input.target.value;
  }
}
