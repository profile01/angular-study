import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable } from 'rxjs';
import { map, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 5) {
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error("Count is greater 3!"));
        }
        count++;
      }, 1000);
    });

    customIntervalObservable.pipe(map((data: number) => {
      return 'Round:' + (data + 1);
    }))

    this.firstObsSubscription = customIntervalObservable.pipe(filter((data:number) => { return data > 0}), map((data: number) => {
      return 'Round:' + (data + 1);
    })).subscribe(count => {
      console.log(count);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log("completed!");
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
