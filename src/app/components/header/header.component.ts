import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
/* import * as io from 'socket.io-client'; */
import { io } from 'socket.io-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  currentUser: any = {};
  temperature!: number;
  humidity!: number;
  private socket: any

  constructor(public authService: AuthService,
    private activatedRoute: ActivatedRoute) {

// Recuperer les informations de l'utilisateur
let id = this.activatedRoute.snapshot.paramMap.get('id');
this.authService.getUserProfile(id).subscribe((res) => {
this.currentUser = res.msg;
});
}
//Deconnexion
logout() {
this.authService.doLogout()
}


ngOnInit(): void {
  this.socket = io('http://localhost:8080');

  this.socket.on('connect', () => {
    console.log('Connected to server');
  });

  this.socket.on('data', (data: any) => {
    this.temperature = data.temperature;
    this.humidity = data.humidity;
  });
}
}
