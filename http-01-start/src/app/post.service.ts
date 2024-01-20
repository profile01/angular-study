import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Observable, Subject, map, catchError, throwError, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http.post<{name: string}>(
      'https://http-test-01-faced-default-rtdb.firebaseio.com/posts.json', 
      postData,
      {
        observe: 'response'
      })
    .subscribe(reponseData => {
      console.log(reponseData);
    }, error => {
      this.error.next(error.message);
    })
  }

  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http.get<{ [key: string] : Post}>(
      'https://http-test-01-faced-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({"Custom-Header": 'hello'}),
        params: searchParams
      }
      )
    .pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for(const key in responseData) {
          if(Object.hasOwn(responseData, key)) {
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      })
    );
  }

  deletePosts() {
    return this.http.delete(
      'https://http-test-01-faced-default-rtdb.firebaseio.com/posts.json', 
      {
        observe: 'events',
      }).pipe(tap(event => {
        console.log(event);
        if(event.type === HttpEventType.Sent) {
          console.log(event);
        }
        if(event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      }));
  }
}