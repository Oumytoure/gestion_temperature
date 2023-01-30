import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Socket } from 'ngx-socket-io';
import { Tem_Hum } from 'src/app/models/temp_hum';
import * as _ from 'lodash'


//import socket client


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
  createDate: any
  last_week:any
  historique: any
  hist8h: any; hist12h: any; hist19h: any
  filter_hist: any

  constructor(private socket: Socket,
              public authService: AuthService){

    this.socket.connect();
    this.socket.on('temperature', (temperature: number) => {
      this.temperature = temperature; 
    });
    this.socket.on('humidity', (humidity: number) => {
      this.humidity = humidity;
    });
  }

  ngOnInit(): void {
    this.createDate  = new Date().getDate() + '/' + new Date().getMonth() +1 + '/' + new Date().getFullYear()
    this.last_week = (new Date().getDate()-7) + '/' + new Date().getMonth() +1 + '/' + new Date().getFullYear()
    
    this.authService.GetDonnees().subscribe(
      data => {
        this.donees = data as unknown as Tem_Hum[];
        this.donne8h = this.donees.filter((e:any)=> e.Heure == '08:00:00' && e.Date == this.createDate)
        this.donne12h = this.donees.filter((e:any)=> e.Heure == '12:00:00' && e.Date == this.createDate)
        this.donne19h = this.donees.filter((e:any)=> e.Heure == '19:00:00' && e.Date == this.createDate)
        this.historique = this.donees.filter((e:any)=> e.Date < this.createDate && e.Date >= this.last_week)
        this.hist8h = this.historique.filter((h:any)=> h.Heure == '08:00:00')
        this.hist12h = this.historique.filter((h:any)=> h.Heure == '12:00:00')
        this.hist19h = this.historique.filter((h:any)=> h.Heure == '19:00:00')

        this.filter_hist = this.historique
        this.filter_hist = _.uniqBy(this.filter_hist, 'Date')
      }
    )
  }

   onVentillateur():void{
    this.on = true;
    this.off = false;
  }

   offVentillateur():void{
    this.on = false;
    this.off = true;
  }
}