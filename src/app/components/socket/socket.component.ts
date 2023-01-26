import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent {
  public data$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io('http://localhost:4000/api');



  ngOnInit() {}


  public getNewMessage = () => {
    this.socket.on('data', (data) =>{
      this.data$.next(data);
    });

    return this.data$.asObservable();
  };
}
