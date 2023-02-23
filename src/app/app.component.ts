import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom, from, tap } from 'rxjs';
import 'zone.js'
import 'zone.js/dist/zone-patch-rxjs.js'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Hello from Angular</h1>`
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
      this.wrapper('obs_foo', this.observableExample)?.subscribe();
      this.wrapper('promise_foo', this.promiseExample);
  }

  wrapper(zoneName: string, fun?: any, ...args: any): any {
    return Zone.current.fork({
      name: zoneName
    })
    .run(() => {
      return fun.apply(this, args)
    })
  }

  observableExample() {
    return from([1]).pipe(
      tap(_ => {
        this.wrapper('obs_bar', this.logger);
      })
    )
  }

  promiseExample() {
    return firstValueFrom(from([1]))
      .then(_ => {
        this.wrapper('promise_bar', this.logger);
      })
  }

  logger() {
    console.log(Zone.current.name, Zone.current.parent?.name)
  }
  
}
