import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Socket } from 'ngx-socket-io';
import { Tem_Hum } from 'src/app/models/temp_hum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  currentUser: any = {};
  temperature!: number;
  humidity!: number;
  Mtemp!: any; Mhum!: any
  donees!: Tem_Hum[];
  donne8h:any; donne12h:any; donne19h:any
  dateNow: any
  temp8h:any; temp12h:any; temp19h:any
  hum8h:any; hum12h:any; hum19h:any

  constructor(private socket: Socket,
              public authService: AuthService) {

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

ngOnInit(): void {
  this.dateNow  = new Date().getDate() + '/' + new Date().getMonth() +1 + '/' + new Date().getFullYear() 
  this.authService.GetDonnees().subscribe(
    data => {
      this.donees = data as unknown as Tem_Hum[]
      
      this.donne8h = this.donees.filter((e:any)=> e.Heure == '08:00:00' && e.Date == this.dateNow)
      this.donne12h = this.donees.filter((e:any)=> e.Heure == '12:00:00' && e.Date == this.dateNow)
      this.donne19h = this.donees.filter((e:any)=> e.Heure == '19:00:00' && e.Date == this.dateNow)

      this.temp8h = this.donne8h[0].Temperature;
      this.temp12h = this.donne12h[0].Temperature; 
      this.temp19h = this.donne19h[0].Temperature;
      this.hum8h = this.donne8h[0].Humidity;
      this.hum12h = this.donne12h[0].Humidity;
      this.hum19h = this.donne19h[0].Humidity;

      this.Mtemp = (parseInt(String(this.temp8h)) + parseInt(String(this.temp12h)) + parseInt(String(this.temp19h))) / 3; 
      this.Mhum = (parseInt(String(this.hum8h)) + parseInt(String(this.hum12h)) + parseInt(String(this.hum19h))) / 3;
    }
  )
}

//Deconnexion
logout() {
this.authService.doLogout()
}

}
