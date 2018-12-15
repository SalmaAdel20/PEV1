import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from "firebase";
import {HomePage} from "../home/home";
import { AddressPage } from '../address/address';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-add-child',
  templateUrl: 'add-child.html',
})
export class AddChildPage {
  item = {};
  currentUser: any;
  usersLocationLat: any;
  usersLocationLng: any;
  Saddress : {};
  ua: any = '';
  usa:any = '';
  ref = firebase.database();
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private fdb: AngularFireDatabase) {
    this.currentUser = firebase.auth().currentUser;
    this.Saddress = navParams.get('Address');
  }

  AddChild(ChildName,ChildAge,Address,SchoolName,SchoolAddress){
   if(Address!=null){
     this.ua = Address;
   }
   if(SchoolAddress !=null){
     this.usa = SchoolAddress;
   }
    this.item = {
      UID: this.currentUser.uid,
      Name:ChildName,
      Age:ChildAge,
      UA: this.ua,
      Ulat: this.usersLocationLat,
      Ulng: this.usersLocationLng,
      SName:SchoolName,
      USA: this.usa,
      Slat:this.Saddress[0].lat,
      Slng:this.Saddress[0].lng,
    };

    let newItem = this.ref.ref('Childes/'+ this.currentUser.uid).push();
    newItem.set(this.item);
    this.navCtrl.push(HomePage);
  }
  GoToMap(){
    this.navCtrl.push(AddressPage);
  }
  MYLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.usersLocationLat = resp.coords.latitude,
      this.usersLocationLng = resp.coords.longitude
      console.log(resp.coords.latitude + '~~'+ resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
