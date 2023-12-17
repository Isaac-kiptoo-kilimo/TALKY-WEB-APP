import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post, PostDetails } from 'src/app/interface/post';
import { PostService } from 'src/app/services/post.service';
import { UploadphotoService } from 'src/app/services/uploadphoto.service';
import { UserDetails } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  visible = true;
  postImage!: File;
  createPostForm!: FormGroup;
  userDetails!: UserDetails;
  userID: string = '';
  postFiles: any[] = [];
  posts!: Post[];
 


  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private uploadService: UploadphotoService,
    private postService: PostService,
    private toastr: ToastrService,
    private authService: AuthService,
    private el: ElementRef
  ) {
    this.createPostForm = this.formbuilder.group({
      postImage: '',
      caption: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getPosts()
    this.authService.getUserDetails().subscribe(
      (userDetails) => {
        console.log(userDetails[0].fullName);
        this.userDetails = userDetails[0];
        this.userID = userDetails[0].userID;
      },
      (error) => {
        console.error('Error getting user details:', error);
      }
    );
  }



  createPost() {
   
    console.log(this.createPostForm.value);
  
    if (this.createPostForm.valid) {
      const imageUrls: string[] = [];
    
      
      for (let index = 0; index < this.postFiles.length; index++) {
        const data = new FormData();
        const file_data = this.postFiles[index];
        data.append('file', file_data);
        data.append('upload_preset', 'i7nxuoly');
      data.append('cloud_name', 'dyisqzh7l');
    
        this.uploadService.uploadImage(data).subscribe((res) => {
          console.log(res.secure_url);
          imageUrls.push(res.secure_url);
    
          if (imageUrls.length === this.postFiles.length) {
            this.createPostForm.value.postImage = imageUrls ;
    
            let details: PostDetails = this.createPostForm.value;
            details.createdAt = new Date().toISOString();
            details.userID = this.userID;

            this.postService.createPost(details).subscribe(
              (response) => {
                console.log(response);
                this.toastr.success('Form submitted successfully!', 'Success');
    
                this.getPosts();
                this.createPostForm.reset();
                this.postFiles = []; 
              },
              (error) => {
              
                this.toastr.error(`${error}`, 'Error');
                console.error('Error submitting form:', error);
              }
            );
          }
        });
      }
    }
    

    else {
      this.toastr.error('Form is invalid. Please check the fields.', 'Error');
      console.log('Form is invalid. Please check the fields.',this.createPostForm.value);
    }
  }


  getPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      console.log(posts[0].username);
    },
    (error) => {
      console.error('Error fetching users:', error.error.message);
    });
  }

  closeModal() {
    
    const modal = this.el.nativeElement.querySelector('.createPostModal') as HTMLDivElement; 
    setTimeout(() => {
      modal.style.display = 'none';      
      this.getPosts();
    }, 1000); 
  }

  onSelectPostImage(event: any) {
    console.log(event);
    this.postFiles.push(...event.addedFiles);
  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.postFiles.splice(this.postFiles.indexOf(event), 1);
  }

  // onFileSelected(event: any) {
  //   const fileInput = event.target;
  //   if (fileInput.files.length > 0) {
  //     this.postImage = fileInput.files[0];
  //   }
  // }

  // createPost() {
  //   if (this.createPostForm.valid) {
  //     const data = new FormData();
      
  //     console.log(this.postImage);
      
  //     data.append('postImage', this.postImage);
  //     data.append('upload_preset', 'i7nxuoly');
  //     data.append('cloud_name', 'dyisqzh7l');

  //     this.uploadService.uploadImage(data).subscribe(
  //       (response) => {
  //         console.log(response);
          
  //         const imageUrl = response.secure_url;
  //         this.createPostForm.patchValue({ postImage: imageUrl });

  //         const details: PostDetails = this.createPostForm.value;
  //         console.log(details);
          
  //         details.createdAt = new Date().toISOString();
  //         details.userID = this.userID;

  //         this.postService.createPost(details).subscribe(
  //           (response) => {
  //             console.log(response);
  //             this.toastr.success('Form submitted successfully!', 'Success');
  //             this.createPostForm.reset();
  //           },
  //           (error) => {
  //             this.toastr.error(`${error}`, 'Error');
  //             console.error('Error submitting form:', error);
  //           }
  //         );
  //       },
  //       (error) => {
  //         console.error('Error uploading image:', error);
  //       }
  //     );
  //   }
  // }
  }
