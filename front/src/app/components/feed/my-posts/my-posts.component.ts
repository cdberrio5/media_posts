import { Component } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { enviroment } from './../../../../environments/enviroment';

import { faPaperPlane, faAnglesLeft, faAngleLeft, faAnglesRight, faAngleRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})

export class MyPostsComponent {
  filterForm!: FormGroup;
  fapaperplane = faPaperPlane;
  faanglesleft = faAnglesLeft;
  faangleleft = faAngleLeft;
  faanglesright = faAnglesRight;
  faangleright = faAngleRight;

  date: string = "";
  nextPage: number = 1;

  posts = null

  lastPage = 1;
  firstPage = 1;
  actualPage = 1;
  second = 1;
  third = 1;
  next = 1;
  before = 1;

  total = 0;
  show = 0;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      date: ['']
   }); 

   this.loadPosts();
  }

  loadPosts() {

    const Authorization = localStorage.getItem("secret-key")

    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Authorization': Authorization ? Authorization : ""
      }),
      params: {
        date: this.date,
      }
    }

    this.http.get<any>(enviroment.ApiUrlPost + "my-posts", httpOptions, ).subscribe(res => {
      this.posts = res.posts.length > 0 ? res.posts : null;
      this.total = res.posts.length > 0 ? res.posts[0]["total"] : 0; 
      this.show  = res.posts.length;

      this.lastPage = res.pages;

      this.actualPage  = res.pages > 2 ? res.pages - 3 : 1;
      this.second = res.pages > 1 ? this.actualPage + 1 : 1;
      this.third  = res.pages > 2 ? this.actualPage + 2 : 1;

      this.next = this.second;
      this.before = this.actualPage > 1 ? this.actualPage - 1 : 1;
    }, err => {
      if(err.error.status == "expired") {
        this.router.navigate(["/log-out"]);
      }
      
    })
  }

  pagination(nextPage: number) {
    this.nextPage = nextPage;

    this.loadPosts();
  }

  filterDate(time: any) {
    this.date = time.target.value; 

    this.loadPosts();
  }
}
