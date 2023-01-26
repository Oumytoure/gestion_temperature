import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-content-accueil',
  templateUrl: './content-accueil.component.html',
  styleUrls: ['./content-accueil.component.css']
})
export class ContentAccueilComponent {
  on: boolean = false;
  off: boolean = true;
  temperature!: number;
  humidity!: number;

  constructor(private socket: Socket){
    this.socket.connect();
    this.socket.on('temperature', (temperature: number) => {
      this.temperature = temperature; console.log(temperature);
    });
    this.socket.on('humidity', (humidity: number) => {
      this.humidity = humidity; console.log(humidity);
    });
  }

  public onVentillateur():void{
    this.on = true;
    this.off = false;
  }

  public offVentillateur():void{
    this.on = false;
    this.off = true;
  }
}