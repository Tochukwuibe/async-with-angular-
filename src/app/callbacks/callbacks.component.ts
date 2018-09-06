import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-callbacks',
  templateUrl: './callbacks.component.html',
  styleUrls: ['./callbacks.component.scss']
})
export class CallbacksComponent implements OnInit {

  public fruits: string [] = [];

  constructor() { }

  ngOnInit() {
  }


  public example1() {

    setTimeout(() => {
     this.fruits.push('apples');
    }, 3000);

    setTimeout(() => {
      this.fruits.push('bananas');
    }, 2000);

    setTimeout(() => {
      this.fruits.push('peaches');
    }, 1000);
  }

  public example2() {

    setTimeout(() => {
      this.fruits.push('apples');

      setTimeout(() => {
        this.fruits.push('bananas');

        setTimeout(() => {
          this.fruits.push('peaches');
        }, 1000);

      }, 2000);

    }, 3000);

  }

  public example3() {
    setTimeout(() => {
      this.logFirst();
    }, 3000);
  }


  private logFirst() {
    this.fruits.push('apples');
    setTimeout(() => {
      this.logSecond();
    }, 2000);
  }

  private logSecond() {
    this.fruits.push('bananas');
    setTimeout(() => {
      this.logThird();
    }, 2000);
  }

  private logThird() {
    this.fruits.push('peaches');
  }

}
