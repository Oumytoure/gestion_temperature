import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    [x: string]: any;
    endpoint: string = 'http://localhost:4000/api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    currentUser = {};
    httpClient: any;

    constructor(private http: HttpClient, public router: Router) {}
  
     // Recuperer tous les utilisateurs
    GetUsers() {
        return this.http.get(`${this.endpoint}`);
  
    }
  
    // Recuperer un utilisateur
    GetUser(id: any): Observable<any> {
        let API_URL = `${this.endpoint}/read-user/${id}`;
        return this.http.get(API_URL, { headers: this.headers }).pipe(
        map((res: any) => {
            return res || {};
        }),
        catchError(this.handleError)
        );
    }
  
    // Update user
    updateUser(id: any, data: any): Observable<any> {
        let API_URL = `${this.endpoint}/update-user/${id}`;
        return this.http
        .put(API_URL, data, { headers: this.headers })
        .pipe(catchError(this.handleError));
    }
    //Update mdp
    update1User(id: any, data: any): Observable<any> {
      console.log(id);
  
      console.log(data);
  
      let API_URL = `${this.endpoint}/update1/${id}`;
  
      return this.http.patch(`${this.endpoint}/update1/${id}`, 
      {"actuelPass": data.actuelPass,
    "newPass":data.newPass})
    }
  
    /*  */
   /*  update1User(id: any, data: any):Observable<any>{
      let API_URL = `${this.endpoint}/update1-user/${id}`;
      return this.http.
      put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));

    } */

    // Ajouter un utilisateur
    addUser(prenom: string, nom: string, email: string, role: string, password: string, etat: boolean, matricule: String): Observable<any> {
        const user={
          prenom: prenom,
          nom: nom,
          email:email,
          password: password,
          etat:etat,
          role:role,
          matricule:matricule
        }
      return this.http.post<User>(`${this.endpoint}/add-user`, user, {
        reportProgress: true,
        observe: 'events',
      });
    }
  
    // Connexion
    login(user: User) {
      return this.http
        .post<any>(`${this.endpoint}/login`, user)
    }
    getToken() {
      return localStorage.getItem('access_token');
    }
    get isLoggedIn(): boolean {
      let authToken = localStorage.getItem('access_token');
      return authToken !== null ? true : false;
    }
    doLogout() {
      let removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        this.router.navigate(['log-in']);
      }
    }

    // User profile
    getUserProfile(id: any): Observable<any> {
      let api = `${this.endpoint}/user-profile/${id}`;
      return this.http.get(api, { headers: this.headers }).pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
    }

    
    // Error
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }
  }
  