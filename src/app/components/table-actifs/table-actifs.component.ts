import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-actifs',
  templateUrl: './table-actifs.component.html',
  styleUrls: ['./table-actifs.component.css']
})
export class TableActifsComponent implements OnInit {
currentUser: any = {};
filterTerm!: string;
Users: any = [];
user: any;
totalLenght: any;
page: number = 1;
formGroup!: FormGroup;
submitted = false;
errMsg:any = true;

constructor(private activatedRoute: ActivatedRoute,
            private formBuilder: FormBuilder,
            public authService: AuthService){

            // Recuperer les informations de l'utilisateur
            let id = localStorage.getItem('id'); 
            this.authService.getUserProfile(id).subscribe((res) => {
              this.currentUser = res.msg;
            });
                

              this.formGroup = this.formBuilder.group({
                prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
                nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
                email: ['', [Validators.required, Validators.email]]
              })
}

ngOnInit(): void {
  this.authService.GetUsers().subscribe(
    data =>{
      this.user = data;
      this.Users = this.user.filter((e:any)=> e.etat == true)
        console.log(this.Users)
      }
  );
}

switcher = (id:any,role:any) => {
  role == "Administrateur" ? role ="Utilisateur": role = "Administrateur"
  const user ={
   role : role
  }
  this.authService.updateUser(id,user).subscribe(
    data=>{
      this.ngOnInit();
    });
}

archiver=(id:any,etat:any)=> {
  etat == true ? etat =false: etat = true
  const user ={
   etat : etat
  }
  Swal.fire({
    title: 'Archivage',
    text: 'Êtes-vous sûre de vouloir archiver ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmer',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.value) {
  this.authService.updateUser(id,user).subscribe(
    data=>{
      this.ngOnInit();
    });
  }else if (result.dismiss === Swal.DismissReason.cancel) {
  }
  })
}

getUserData(id:any,prenom:any,nom:any,email:any){

  this.formGroup = this.formBuilder.group({
      id:[id],
      prenom: [prenom, [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: [nom, [Validators.required, UsernameValidator.cannotContainSpace]],
      email: [email, [Validators.required, Validators.email]],
    });
}

onUpdate(){
  const id =  this.formGroup.value.id;
const user ={
prenom: this.formGroup.value.prenom,
nom : this.formGroup.value.nom,
email: this.formGroup.value.email
}
this.submitted = true;
if(this.formGroup.invalid){
 return;
}
  this.authService.updateUser(id, user).subscribe(
    data=>{
      this.ngOnInit();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modification réussi !',
        showConfirmButton: false,
        timer: 1500
      });window.setTimeout(function(){location.reload()},1000)
    },
    error => {
      this.errMsg = false
      setTimeout(()=>{ this.errMsg = true}, 2000);
    });
}
}
