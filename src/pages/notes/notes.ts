import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../environments/environment';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
  currentUser: any;
  items = [];
  ref = firebase.database();
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.currentUser = firebase.auth().currentUser;
    console.log(this.currentUser.uid);
    this.ref.ref('Notes/').on('value', resp => {
      this.items = snapshotToArray(resp);
      console.log(this.items);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  DeleteNote(key) {
    const confirm = this.alertCtrl.create({
      title: 'Delete Note',
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
            firebase.database().ref('Notes/'+ key).remove();
          }
        }
      ]
    });
    confirm.present();

}

}
