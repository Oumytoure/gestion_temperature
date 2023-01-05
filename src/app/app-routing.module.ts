import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TableActifsComponent } from './components/table-actifs/table-actifs.component';
import { TableArchivesComponent } from './components/table-archives/table-archives.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: ConnexionComponent },
  { path: 'addUser', component: InscriptionComponent},
  { path: 'user-profil/:id', component: AccueilComponent, canActivate: [AuthGuard]},
  { path: 'tabarchive', component: TableArchivesComponent},
  { path: 'tabactif' , component: TableActifsComponent},
  { path: 'addUser', component: InscriptionComponent},
  { path: 'nav', component:NavigationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
