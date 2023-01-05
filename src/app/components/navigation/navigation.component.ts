import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  currentUser: any = {};

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
}
