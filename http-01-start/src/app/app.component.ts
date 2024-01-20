import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Post } from './post.model';
import { PostsService } from './post.service';
import { Subscription } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true
    }
  ]
})
export class AppComponent implements OnDestroy {
  loadedPosts: Post[] = []
  isFetching: boolean = false;
  error: string | null = null;

  private errorSub: Subscription | null = null;

  constructor(private postService: PostsService) {}

  ngOnDestroy(): void {
    this.errorSub?.unsubscribe();
  }

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })

    this.isFetching = true;
    this.postService.fetchPost().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);

    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPost().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  onHandleError() {
    this.error = null;
  }
}
