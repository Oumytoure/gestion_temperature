import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUser: any = {};
  temperature!: number;
  humidity!: number;

  constructor(public authService: AuthService,
    private socket: Socket) {

// Recuperer les informations de l'utilisateur
let id = localStorage.getItem('id');  
this.authService.getUserProfile(id).subscribe((res) => {
  this.currentUser = res.msg;
});

this.socket.connect();
this.socket.on('temperature', (temperature: number) => {
  this.temperature = temperature; console.log(temperature);
});
this.socket.on('humidity', (humidity: number) => {
  this.humidity = humidity; console.log(humidity);
});

}
//Deconnexion
logout() {
this.authService.doLogout()
}

ngOnInit(): void {

}
}
