import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from "firebase";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-add-child',
  templateUrl: 'add-child.html',
})
export class AddChildPage {
  item = {};
  currentUser: any;
  ref = firebase.database().ref('Childes/');
  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
    this.currentUser = firebase.auth().currentUser;
    console.log(this.currentUser.uid);
  }

  AddChild(ChildName,ChildAge,Address,SchoolName,SchoolAddress){
    this.item = {
      UID: this.currentUser.uid,
      Name:ChildName,
      Age:ChildAge,
      Address:Address,
      SName:SchoolName,
      SAddress:SchoolAddress
    };
    let newItem = this.ref.push();
    newItem.set(this.item);
    this.navCtrl.push(HomePage);
    ChildName = "";
    ChildAge = null;
    Address = "";
    SchoolName = "";
    SchoolAddress = "";


  }
}
