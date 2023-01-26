import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public data$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io('http://localhost:4000/api');

/*   public sendMessage(message: any) {
    console.log('sendMessage: ', message)
    this.socket.emit('message', message);
  }
 */
  public getNewMessage = () => {
    this.socket.on('data', (data) =>{
      this.data$.next(data);
      console.log(data);
    });

    return this.data$.asObservable();
  };
}


