import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  errMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.formGroup = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }
// Connexion
  loginUser(){
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.authService.login(this.formGroup.value).subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      localStorage.setItem('id', res._id);

      this.authService.getUserProfile(res._id).subscribe((res) => {
        this.authService.currentUser = res;
        this.router.navigate(['user-profil/' + res.msg._id]);
      });
    }, // Intercepter les messages d'erreurs du serveur
    error => {
      this.errMsg = error.error.message
      console.log(error.error.message)
    });
  }
}
