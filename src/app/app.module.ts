import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { PaintComponent } from './paint/paint.component'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = {
  apiKey: "AIzaSyAtIp4nAJYsIZfsTo5ItkkxVf-3yjuR6e4",
  authDomain: "canvaspencil-ee59c.firebaseapp.com",
  projectId: "canvaspencil-ee59c",
  storageBucket: "canvaspencil-ee59c.appspot.com",
  messagingSenderId: "544884783664",
  appId: "1:544884783664:web:71bb89bf130615ce860bf5",
  measurementId: "G-MYQQX9EBDJ"
};

@NgModule({
  declarations: [
    AppComponent,
    PaintComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
