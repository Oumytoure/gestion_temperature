import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent{
  currentUser: any = {};
  showAcceuil:boolean = true;
  showActifs: boolean = false;
  showArchive: boolean = false;
  showInscription: boolean = false;
  showProfil: boolean = false;
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
      this.temperature = temperature;
    });
    this.socket.on('humidity', (humidity: number) => {
      this.humidity = humidity;
    });
  }
    //Deconnexion
    logout() {
      this.authService.doLogout()
    }
    
  public affiche1():void {
    this.showAcceuil = true;
    this.showActifs = false;
    this.showArchive = false;
    this.showInscription = false;
    this.showProfil = false;
    /* this.showSocket= true; */
    
  }
  public affiche2():void {
    this.showAcceuil = false;
    this.showActifs = true;
    this.showArchive = false;
    this.showInscription = false;
    this.showProfil = false;
    /* this.showSocket= true; */
  }
  public affiche3():void {
    this.showAcceuil = false;
    this.showActifs = false;
    this.showArchive = true;
    this.showInscription = false;
    this.showProfil = false
    /* this.showSocket= true; */
  }
  public affiche4():void {
    this.showAcceuil = false;
    this.showActifs = false;
    this.showArchive = false;
    this.showInscription = true;
    this.showProfil = false
    /* this.showSocket= true; */
  }
  public affiche5():void {
    this.showAcceuil = false;
    this.showActifs = false;
    this.showArchive = false;
    this.showInscription = false;
    this.showProfil = true
    /* this.showSocket= true; */
  }
}
