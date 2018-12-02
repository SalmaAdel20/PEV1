import { Component } from '@angular/core';
import { App, Nav, MenuController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import {LoginPage} from '../login/login';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavPush } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(afAuth: AngularFireAuth,private fire:AngularFireAuth,public app: App) {

  }
  logout() : Promise<void> {
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
      return this.fire.auth.signOut();

    }
  
}
