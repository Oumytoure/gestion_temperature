import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'temperature';
  show:any;

  constructor(private router: Router){

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/log-in'|| event.url === '/') {
          this.show = false;
        } else {
          this.show = true;

        }
      }
    });
  }
}
