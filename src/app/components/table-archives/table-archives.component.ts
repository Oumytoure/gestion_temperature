import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-archives',
  templateUrl: './table-archives.component.html',
  styleUrls: ['./table-archives.component.css']
})
export class TableArchivesComponent implements OnInit{
  currentUser: any = {};
  filterTerm!: string;
  Users:any = [];
  user:any;
  totalLenght: any;
  page : number=1;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute){

     // Recuperer les informations de l'utilisateur
     let id = localStorage.getItem('id'); 
     this.authService.getUserProfile(id).subscribe((res) => {
       this.currentUser = res.msg;
     });
  }

  ngOnInit(): void {
    this.authService.GetUsers().subscribe(
      data =>{
        this.user = data;
        this.Users= this.user.filter((e:any)=> e.etat == false)
      }
    );
  }

  dearchiveUser=(id:any,etat:any)=> {

    etat == false ? etat = true : etat = false
     const user ={
     etat : etat
     }
     Swal.fire({
      title: 'Désarchivage',
      text: 'Êtes-vous sûre de vouloir désarchiver ?',
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
    });
  }
}
