import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/services/post.service';
import { UploadphotoService } from 'src/app/services/uploadphoto.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  isFormVisible: boolean=false

  token = localStorage.getItem('token');
  userID = localStorage.getItem('userID');
  profileImage: string = '';
  userName: string = '';
  userEmail: string = '';
  fullName: string = '';
  postFiles: any[] = [];
  posts!: Post[];
  // profilePresent!: boolean;

  updateUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private el: ElementRef,
    private upload: UploadphotoService, private postService:PostService
  ) {
    this.updateUserForm = this.fb.group({
      profileImage: '',
      username: ['', Validators.required],
      fullName: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.getUserDetails()
  }
  
  updateUser() {
    try {
      console.log(this.postFiles);
      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      if (this.updateUserForm.valid) {
        if (this.postFiles.length === 0) {
          let userDetails: any = this.updateUserForm.value;

          this.userService
            .updateUserById(userDetails)
            .subscribe((response) => {
              console.log(response);
              this.updateUserForm.reset();
              this.postFiles = [];
              this.getUserDetails()
                this.isFormVisible = true;
            });
        } else {
          const data = new FormData();
          const file_data = this.postFiles[0];
          data.append('file', file_data);
          data.append('upload_preset', 'i7nxuoly');
          data.append('cloud_name', 'dyisqzh7l');

          this.upload.uploadImage(data).subscribe((res) => {

            this.updateUserForm.value.profileImage = res.secure_url;
            let userDetails: any = this.updateUserForm.value;

            if (!this.token) {
              console.log('there is no token');
              return;
            }

            this.userService
              .updateUserById(userDetails)
              .subscribe((response) => {
                console.log(response);

                this.updateUserForm.reset();
                this.postFiles = [];
                this.getUserDetails()
                this.isFormVisible = true;

                    
              });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
}


getUserDetails(){
  this.userService.checkDetails().subscribe((user)=>{
    console.log(user);
    return user
    
  })
}

onSelectPostImage(event: any) {
  console.log(event);
  this.postFiles.push(...event.addedFiles);
}

onRemovePostImage(event: any) {
  console.log(event);
  this.postFiles.splice(this.postFiles.indexOf(event), 1);
}
}