import { Component } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import firebase from 'firebase/app';
import 'firebase/auth';

const { auth } = firebase;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Canvas-pencil';
  constructor(public auth: AngularFireAuth) {

  }

  signInClicked() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signOutClicked() {
    this.auth.signOut();
  }
}
