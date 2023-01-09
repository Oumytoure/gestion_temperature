import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  currentUser: any = {};


  constructor(public authService: AuthService,
              private activatedRoute: ActivatedRoute){

      // Recuperer les informations de l'utilisateur
     let id = this.activatedRoute.snapshot.paramMap.get('id');
     this.authService.getUserProfile(id).subscribe((res) => {
       this.currentUser = res.msg;
     });
  }
}
