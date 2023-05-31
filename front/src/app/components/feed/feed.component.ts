import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent {
  
  constructor(private router: Router) {

  }

  ngOnInit() {
    if(!localStorage.getItem("secret-key")) {
      this.router.navigate([""]);
    }
  }
}
