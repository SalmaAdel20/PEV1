import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular'
import { NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker, GoogleMapsEvent, Environment, LatLng
} from '@ionic-native/google-maps';
import {AddChildPage} from "../add-child/add-child";

@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  @ViewChild("map") mapElement;
  map: GoogleMap;
  add: {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.platform.ready().then(()=> {
      this.loadMap();
    });
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCOlv2AqB_Dw2I4PctCi80W1JxkdD4AzSA',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCOlv2AqB_Dw2I4PctCi80W1JxkdD4AzSA'
    });
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 30.057496,
          lng: 31.236173
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
          (data) => {
            this.add = data;
            this.map.clear();
            let marker: Marker = this.map.addMarkerSync({
              title: 'Test',
              icon: 'red',
              animation: 'DROP',
              position: {
                lat: data[0].lat,
                lng: data[0].lng
              },
            });
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
              alert(data);
            });
          }
        );
      });
  }

  SetLocation(){
    console.log(this.add[0].lat);
    console.log(this.add[0].lng);
    this.navCtrl.push(AddChildPage,{
      Address: this.add});
  }

  Cancel(){
    this.map.clear();
    this.navCtrl.push(AddChildPage);
  }
}
