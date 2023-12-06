import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { PostlistComponent } from './post/postlist/postlist.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "signup", component: SignUpComponent},
  {path: "user", component: UserDashboardComponent},
  {path: "profile", component: UserProfileComponent},
  {path: "post", component: CreatePostComponent},
  {path: "forgot", component: ForgotPasswordComponent},
  {path: "post", component: PostlistComponent},
  {path: "**", component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
