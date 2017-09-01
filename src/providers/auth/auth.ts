import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
  }

  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  anonymousLogin(): firebase.Promise<any> {
    return this.afAuth.auth.signInAnonymously();
  }

  linkAccount(email: string, password: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this.afAuth.auth.currentUser.linkWithCredential(credential)
      .then(user => {
        this.afDatabase.object(`/userProfile/${user.uid}/`).update({
          email: email
        });
      }, error => {
        console.error('There was an error linking the account', error);
      });
  }

  resetPassword(email): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<void> {
    return this.afAuth.auth.signOut();
  }

}
