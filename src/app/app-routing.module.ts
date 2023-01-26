import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AuthGuard } from './services/auth.guard';
/* import { SocketComponent } from './components/socket/socket.component'; */


const routes: Routes = [
 /*  { path: 'socket', component: SocketComponent }, */
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: ConnexionComponent },
  { path: 'user-profil', component: AccueilComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }