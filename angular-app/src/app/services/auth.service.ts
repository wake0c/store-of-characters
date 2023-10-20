import { Injectable, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';


import { Auth, User, user, authState, GoogleAuthProvider  } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private auth: Auth = inject(Auth);
  authState$ = authState(auth);
  authStateSubscription: Subscription;

  constructor(
    auth: Auth
  ) {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
     console.log(aUser);
    })
  }


  async googleSignin() {
    this.auth.(new GoogleAuthProvider())
    .then((result) => {
      console.log(result);
    });
    const provider = new GoogleAuthProvider();
    const credential = await this.angularFireAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }









}
