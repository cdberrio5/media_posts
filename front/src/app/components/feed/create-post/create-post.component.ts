import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

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
    
  }
}
