import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { faPaperPlane, faAnglesLeft, faAngleLeft, faAnglesRight, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent {
  filterForm!: FormGroup;
  fapaperplane = faPaperPlane;
  faanglesleft = faAnglesLeft;
  faangleleft = faAngleLeft;
  faanglesright = faAnglesRight;
  faangleright = faAngleRight;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      search: [''],
      date: ['']
   }); 
  }

  filter() {
    
  }
}
