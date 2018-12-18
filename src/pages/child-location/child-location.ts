import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker, GoogleMapsEvent, Environment, LatLng
} from '@ionic-native/google-maps';
import * as firebase from 'firebase';
import { snapshotChanges } from 'angularfire2/database';
import { snapshotToArray } from '../../environments/environment';


@Component({
  selector: 'page-child-location',
  templateUrl: 'child-location.html',
})
export class ChildLocationPage {

  map: GoogleMap;
  Currentlat: number=0;
  currentlng: number=0;
  locatoin: any[];
  ref = firebase.database();
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
      this.platform.ready().then(()=> {
        this.ref.ref('currentLocation/').on('value', resp => {
          this.locatoin = snapshotToArray(resp);
          console.log(this.locatoin);
          this.Currentlat = this.locatoin[0].lat;
          this.currentlng = this.locatoin[0].long;
          console.log(this.Currentlat + "~"+ this.currentlng);
        });
        this.loadMap();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildLocationPage');
  }
  // map with current location 
  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCOlv2AqB_Dw2I4PctCi80W1JxkdD4AzSA',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCOlv2AqB_Dw2I4PctCi80W1JxkdD4AzSA'
    });
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.Currentlat,
          lng: this.currentlng
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions) 
    let marker: Marker = this.map.addMarkerSync({
        title: 'Child Now ',
        icon: 'red',
      //  animation: 'DROP',
        position: {
          lat: this.Currentlat,
          lng: this.currentlng
        },
    });
  }
}
