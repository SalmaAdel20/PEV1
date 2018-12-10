import { Component } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from '@angular/fire/auth';
;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any ;
  constructor(public platform: Platform,private fire:AngularFireAuth,public statusBar: StatusBar,public splashScreen: SplashScreen, afAuth: AngularFireAuth/*db: AngularFirestore*/) {
    this.initializeApp();
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
  }
  initializeApp() {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }

}
