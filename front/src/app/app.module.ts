import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http'; // <-

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './components/feed/create-post/create-post.component';
import { MyPostsComponent } from './components/feed/my-posts/my-posts.component';
import { PostsComponent } from './components/feed/posts/posts.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FeedComponent } from './components/feed/feed.component';
import { LogOutComponent } from './components/feed/log-out/log-out.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CreatePostComponent,
    MyPostsComponent,
    PostsComponent,
    NavbarComponent,
    FeedComponent,
    LogOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
