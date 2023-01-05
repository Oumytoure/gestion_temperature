import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  currentUser: any = {};
  showHead:any;

  constructor(public authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

     // Recuperer les informations de l'utilisateur
     let id = this.activatedRoute.snapshot.paramMap.get('id');
     this.authService.getUserProfile(id).subscribe((res) => {
       this.currentUser = res.msg;
     });


     router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/user-profil/:id') {
          this.showHead = true;
        } else {
          this.showHead = false;
        }
      }
    });
  }
    //Deconnexion
    logout() {
      this.authService.doLogout()
    }
    
  
}
