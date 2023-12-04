import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { PostlistComponent } from './post/postlist/postlist.component';
import { PostComponent } from './post/post/post.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent,
    UserDashboardComponent,
    EditProfileComponent,
    CreatePostComponent,
    PostlistComponent,
    PostComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }