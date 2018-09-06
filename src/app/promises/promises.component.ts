import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.scss']
})
export class PromisesComponent implements OnInit {


 public posts: string [] = [];

 private id = 1;

  constructor() { }

  ngOnInit() {

  }

// solving callback hell
  public example1() {
    this.promiseTimeout(() => {
      this.posts.push('diamondback');
    }, 3000)
    .then(() => {

      return this.promiseTimeout(() => {
        this.posts.push('New York Times');
      }, 2000);
    })
    .then(() => {

      return this.promiseTimeout(() => {
        this.posts.push('Daily Planet');
      }, 1000);
    });
  }


  // fetch post
  public example2() {
    this.get()
    .then((names) => this.posts = names);
  }

  public example3() {
    this.getOne(this.id)
    .then((title) => {
      this.posts.push(title);
      this.id++;
    });
  }

  public example4() {
  const interval =  setInterval(() => {
        this.example3();
    }, 2000);

    // setTimeout(() => {
    //   clearInterval(interval);
    // }, 10000);
  }







  private promiseTimeout(callback: Function, timeout: number) {
    return new Promise((res, rej) => {

        setTimeout(() => {
          res(callback());
        }, timeout);
    });
  }



  private get() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) =>  res.json())
    .then((posts) => posts.map((post) => post.title));
  }

  private getOne(id: number) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) =>  res.json())
    .then((post) => post.title);
  }

}
