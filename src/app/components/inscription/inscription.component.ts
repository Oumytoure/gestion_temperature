import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { UsernameValidator } from 'src/app/username.validator';
import { MustMatch } from 'src/app/must-match.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  formGroup: FormGroup;
  submitted = false;
  percentDone?: any = 0;
  errMsg: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone) {

    this.formGroup = this.formBuilder.group({
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
      etat: [1, Validators.required],
      matricule: ['']
    }, { validator: MustMatch('password', 'passwordConfirm') }
    )
  }

  listDeroulant = ['Administrateur', 'Utilisateur'];

  addUsers() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.submitted=false
    //générer matricule pour administrateur et utilisateur
    let matriculeGenerate;
    this.formGroup.value.role == "Administrateur" ? matriculeGenerate = "MAT" + (Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1))
      : matriculeGenerate = "MUT" + (Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1));
    this.formGroup.controls.matricule.setValue(matriculeGenerate)

    this.authService.addUser(this.formGroup.value.prenom, this.formGroup.value.nom,
      this.formGroup.value.email, this.formGroup.value.role, this.formGroup.value.password,
      this.formGroup.value.etat, this.formGroup.value.matricule).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            
            break;
          case HttpEventType.ResponseHeader:
            
            break;
          case HttpEventType.Response:
           
        this.percentDone = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Inscription réussi !',
          showConfirmButton: false,
          timer: 1500
        }); window.setTimeout(function () { location.reload() }, 1000)
          break;
      }
      }, // Intercepter les messages d'erreurs du serveur
        error => {
          this.errMsg = error.error.error
        })
  }
}
