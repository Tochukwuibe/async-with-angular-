import { Component, OnInit } from '@angular/core';
import { Observable, of, from, interval } from 'rxjs';
import {switchMap, scan, take, skip, map, tap, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  public posts$: Observable<string[]> = of([]);
  public comments$: Observable<any[]> = of([]);
  public posts: string [] = [];


  constructor() { }

  ngOnInit() {

  }

  public reset() {
    this.posts$ = of([]);
    this.posts = [];
    this.comments$ = of([]);
  }

  public example1() {

    from(this.get())
    .subscribe((posts) => {
      this.posts = posts;
    });

  }

  public example2() {
    this.posts$ = from(this.get());
  }

  example3() {
    this.posts$ = interval(1000).pipe(
      skip(1),
      switchMap((num) => this.getOne(num)),
      tap((post) => console.log('post', post)),
      map((post) => post.title),
      scan((acc, cur) => acc.concat([cur]), []),
      take(5)
    );
  }

  example4() {
    this.comments$ = of(Math.random() * 10)
    .pipe(
      map((random) => Math.round(random)),
      tap((id) => console.log('the post id ', id)),
      filter(res => !!res),
      switchMap((postId) => this.getComments(postId))
    );
  }



  private get() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) =>  res.json())
    .then((posts) => posts.map((post) => post.title));
  }

  private getOne(id: number) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) =>  res.json());
    // .then((post) => post.title);
  }

  private getComments(postId: number) {
    return fetch(`https://jsonplaceholder.typicode.com/comments/?postId=${postId}`)
    .then((res) =>  res.json());
  }

}
