import { Component } from '@angular/core';
import { App, Nav, MenuController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { HomePage } from '../home/home';
import { NotesPage} from "../notes/notes";
import { AddChildPage } from "../add-child/add-child";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddChildPage;
  tab3Root = NotesPage;

  constructor(afAuth: AngularFireAuth,private fire:AngularFireAuth,public app: App) {
  }
  logout() : Promise<void> {
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
      return this.fire.auth.signOut();

    }
  
}
