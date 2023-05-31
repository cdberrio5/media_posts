import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//auth
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

//feed
import { FeedComponent } from './components/feed/feed.component';
import { PostsComponent } from './components/feed/posts/posts.component';
import { CreatePostComponent } from './components/feed/create-post/create-post.component';
import { MyPostsComponent } from './components/feed/my-posts/my-posts.component';

const routes: Routes = [
  { path: "auth/login", component: LoginComponent, title: "Login" },
  { path: "auth/register", component: RegisterComponent, title: "Register" },
  { path: "", redirectTo: 'auth/login', pathMatch: "full" },
  {
    path: "home", component: FeedComponent, children: [
      { path: "", component: PostsComponent },
      { path: "create-post", component: CreatePostComponent },
      { path: "my-posts", component: MyPostsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
