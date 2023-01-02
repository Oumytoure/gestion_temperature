import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/authconfig.interceptor';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TableActifsComponent } from './components/table-actifs/table-actifs.component';
import { TableArchivesComponent } from './components/table-archives/table-archives.component';
import { AccueilComponent } from './components/accueil/accueil.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    NavigationComponent,
    TableArchivesComponent,
    TableActifsComponent,
    InscriptionComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
