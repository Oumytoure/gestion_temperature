import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';
import { MustMatch } from 'src/app/must-match.validator';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit{

currentUser: any = {};
filterTerm!: string;
Users: any = [];
user: any;
totalLenght: any;
formGroup!: FormGroup;
registerForm: FormGroup
submitted = false;
errMsg:any = true;
userCollection: any;
pass!: string;


  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService) {

      // Recuperer les informations de l'utilisateur
      let id = localStorage.getItem('id');  
      this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;

     });

     this.formGroup = this.formBuilder.group({
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      email: ['', [Validators.required, Validators.email]],
    }
    );

          //controle de saisi modif mot de passe
          this.registerForm = this.formBuilder.group({
            actuelPass:['', [Validators.required, Validators.minLength(6)],],
            newPass:['', [Validators.required, Validators.minLength(6)],],
            confirmdp:['', [Validators.required],]
          }, { validator: MustMatch('newPass', 'confirmdp') }
          );


   }

  ngOnInit(): void {
    this.authService.GetUsers().subscribe(
      data => {
        this.user = data;
        this.Users = this.user.filter((e: any) => e.etat == true)
        console.log(this.Users)
      }
    );
  }

//modifier les données de l'utilisateur
  getUserData(id:any,prenom:any,nom:any,email:any){
 id = localStorage.getItem('id');

    this.formGroup = this.formBuilder.group({
      id: [id],
      prenom: [prenom, [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: [nom, [Validators.required, UsernameValidator.cannotContainSpace]],
      email: [email, [Validators.required, Validators.email]],

    });
  }

  onUpdate() {
    const id = this.formGroup.value.id;
    const user = {
      prenom: this.formGroup.value.prenom,
      nom: this.formGroup.value.nom,
      email: this.formGroup.value.email,

    }
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.authService.updateUser(id, user).subscribe(
      data => {
        this.ngOnInit();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Modification réussi !',
          showConfirmButton: false,
          timer: 1500
        }); window.setTimeout(function () { location.reload() }, 1000)
      },
      error => {
        this.errMsg = false
        setTimeout(() => { this.errMsg = true }, 2000);
      });

  }

     //modification paseword
     update1User(){
      const id =  this.registerForm.value.id;    
      const userCollection={
       actuelPass: this.registerForm.value.actuelPass,
        newPass: this.registerForm.value.newPass,
       confirmdp: this.registerForm.value.confirmdp 
     }
     
     
      this.submitted = true;
      if(this.registerForm.invalid){
        /* console.log(this.registerForm.errors); */
        
       return ;
     }
     
      
     
     // retourne a la page deconnection apres le popup modification reussi
     return this.authService.update1User(localStorage.getItem('id'),userCollection).subscribe((data)=>{
      this.ngOnInit();
       
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modification  mot de passe réussi !',
        showConfirmButton: false,
        timer: 1500
      });
     this.authService.doLogout()
     },
     (err)=>{
         this.pass="mot de passe actuel est incorrect ";
     })
       } 
}