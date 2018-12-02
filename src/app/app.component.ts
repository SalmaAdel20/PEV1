import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFirestore } from '@angular/fire/firestore';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any ;
  items: Observable<any[]>;
  constructor(platform: Platform,private fire:AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth/*db: AngularFirestore*/) {
    const authObserver = afAuth.authState.subscribe(user => {
      var user = this.fire.auth.currentUser;
      if (user) {
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      //this.items = db.collection('items').valueChanges();
      
    });
  }
}
