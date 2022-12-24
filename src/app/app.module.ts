import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { HeaderComponent } from './components/header/header.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TableActifsComponent } from './components/table-actifs/table-actifs.component';
import { TableArchivesComponent } from './components/table-archives/table-archives.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    NavigationComponent,
    HeaderComponent,
    TableArchivesComponent,
    TableActifsComponent,
    InscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
