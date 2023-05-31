import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import swal from 'sweetalert2';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent {
  postForm!: FormGroup;


  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: [''],
      message: ['']
   }); 
  } 

  createPost() {
    console.log("a");
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
}
