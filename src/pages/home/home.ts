import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from "angularfire2/database";
import {snapshotToArray} from "../../environments/environment";
import {AddChildPage} from "../add-child/add-child";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser: any;
  items = [];
  ref = firebase.database().ref('Childes/');

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private fdb: AngularFireDatabase) {
    this.currentUser = firebase.auth().currentUser;
    console.log(this.currentUser.uid);
    this.ref.on('value', resp => {
      this.items = snapshotToArray(resp);
      console.log(this.items);
    });
  }

  GoToAdd(){
    this.navCtrl.push(AddChildPage);
  }
  GoToLocate(){
    this.navCtrl.push("");
  }
  DeleteChild(key) {
      const confirm = this.alertCtrl.create({
        title: 'Delete Child',
        message: 'Are You Sure?!',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
            }
          },
          {
            text: 'Delete',
            handler: () => {
              firebase.database().ref('Childes/' + key).remove();
            }
          }
        ]
      });
      confirm.present();

  }
}
