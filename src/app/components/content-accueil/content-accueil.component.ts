import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Socket } from 'ngx-socket-io';
import { Tem_Hum } from 'src/app/models/temp_hum';
import * as _ from 'lodash'

@Component({
  selector: 'app-content-accueil',
  templateUrl: './content-accueil.component.html',
  styleUrls: ['./content-accueil.component.css']
})
export class ContentAccueilComponent implements OnInit{
  on: boolean = false;
  off: boolean = true;
  temperature!: number;
  humidity!: number;
  donees!: Tem_Hum[];
  donne8h: any; donne12h: any; donne19h: any
  dateNow: any
  last_week:any
  historique: any
  hist8h: any; hist12h: any; hist19h: any
  filter_hist: any
  jour:any; mois:any

  constructor(private socket: Socket,
              public authService: AuthService){

    this.socket.connect();
    this.socket.on('temperature', (temperature: number) => {
      this.temperature = temperature; 
      if (temperature > 30) { // Afficher le ventillateur allumé lorsque la temperature est supérieur a 30
        this.on = true
        this.off = false
      }
    
    });
    this.socket.on('humidity', (humidity: number) => {
      this.humidity = humidity;
    });

    this.socket.on('status', (status: string) => {
      console.log(`Status: ${status}`);
    });
  }

  ngOnInit(): void {
    this.jour = new Date().getDate()
    this.mois = new Date().getMonth()+1
    if (this.jour < 10) {
      this.jour = '0' + this.jour
    }
    if (this.mois < 10) {
      this.mois = '0' + this.mois
    }
    this.dateNow  = this.jour + '/' + this.mois + '/' + new Date().getFullYear()
    this.last_week = this.jour - 7 + '/' + this.mois + '/' + new Date().getFullYear(); console.log(this.last_week)
    this.authService.GetDonnees().subscribe(
      data => {
        this.donees = data as unknown as Tem_Hum[]; // Stoke tous les données de la bdd
        this.donne8h = this.donees.filter((e:any)=> e.Heure == '08:00:00' && e.Date == this.dateNow) // Recupere la temperature et l'humidité du jour à 8H
        this.donne12h = this.donees.filter((e:any)=> e.Heure == '12:00:00' && e.Date == this.dateNow)
        this.donne19h = this.donees.filter((e:any)=> e.Heure == '19:00:00' && e.Date == this.dateNow)
        this.historique = this.donees.filter((e:any)=> e.Date != this.dateNow); console.log(this.historique); // Recupere l'historique de la semaine
        
        this.hist8h = this.historique.filter((h:any)=> h.Heure == '08:00:00') // Recupére l'historique à 8H
        this.hist12h = this.historique.filter((h:any)=> h.Heure == '12:00:00')
        this.hist19h = this.historique.filter((h:any)=> h.Heure == '19:00:00')

        this.filter_hist = this.historique
        this.filter_hist = _.uniqBy(this.filter_hist, 'Date') // Filtrer la date pour pouvoir afficher une seule sur les 3 insertions
      }
    )
  }

   onVentillateur():void{
    this.on = true;
    this.off = false;
    this.socket.emit('turn', '1'); // envoie le message 1 lorsqu'on execute la fonction
  }

   offVentillateur():void{
    this.on = false;
    this.off = true;
    this.socket.emit('turn', '0'); // envoie le message 0 lorsqu'on execute la fonction
  }
}