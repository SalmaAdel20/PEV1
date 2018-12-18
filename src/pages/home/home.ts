import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from "angularfire2/database";
import {snapshotToArray} from "../../environments/environment";
import {AddChildPage} from "../add-child/add-child";
import { ChildLocationPage } from '../child-location/child-location';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser: any;
  items = [];
  ref = firebase.database();
//-----------------child variables----------------------------------------------------------------
 
ChildData=[];
allchilds = firebase.database();
currentlocation = firebase.database();
currentuserchild:any;
childsdatalist: any;
schoolLat:any;
schoolLong:any;
Homelat:any;
Homelong:any;
currentLat:number;
currentlong:number;
list:any;
distancefromschoolinMeters:any;
distancefromHomeinMeters:any;
flag1:number=0;
flag2:number=0;
//-------------------notes variables--------------------------------------------------------------
 NotesList = [];
 notemessage :any;
 notemessageID :any;
 notemessageContent:any;
 count:number=0;
 notificationCounter:number=1;
 notes = firebase.database().ref('Notes/');
//-------------------------------------------------------------------------------------
public myPerson = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public localNotifications: LocalNotifications, private fdb: AngularFireDatabase) {
    this.currentUser = firebase.auth().currentUser;
    console.log(this.currentUser.uid);
    this.ref.ref('Childes/'+this.currentUser.uid).on('value', resp => {
      this.items = snapshotToArray(resp);
      console.log(this.items);
    });
  }

  GoToAdd(){
    this.navCtrl.push(AddChildPage);
  }
  GoToLocate(){
    this.navCtrl.push(ChildLocationPage);
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
              firebase.database().ref('Childes/' +this.currentUser.uid + '/'+ key).remove();
            }
          }
        ]
      });
      confirm.present();

  }
////////////////////////////////////////////////////////////////////////////
//--------------------------------Notes---------------------------------------------------------------------------------------
notifyNotes(){ 
  this.count=0;
  this.notes.on('value', resp => {
    this.NotesList = snapshotToArray(resp);

    while (this.count<this.NotesList.length) {
      try{
        console.log(this.NotesList.length);
        console.log(this.NotesList.filter(item => item.SeenByParent === 0)[this.count].Note);
        
    this.notemessage=this.NotesList.filter(item => item.SeenByParent === 0)[this.count];
    this.notemessageContent= this.notemessage.Note.toString();
    this.notemessageID= this.notemessage.key;
    console.log(  this.notemessageID);

    this.fdb.list("/Notes").update(
      this.notemessageID.toString(),{SeenByParent:1});
    
    //********************localNotification*********************************************
        this.localNotifications.schedule({
          id:this.notificationCounter,
          title: 'Message From Your Child ',
          text: this.notemessageContent,
        });
      }catch{
      }
      this.notificationCounter=this.notificationCounter+1;
      this.count=this.count+1;
    }
  });}
//--------------------------locationNotification-------------------------------------------------------------------------------------------
  notifyLocation(){
    //----------------current user child data-----------------------------------------------------------------
    this.childsdatalist = this.allchilds.ref('Childes/'+this.currentUser.uid);
    this.allchilds.ref('Childes/'+this.currentUser.uid).on('value', resp => {
    this.childsdatalist = snapshotToArray(resp);
    this.schoolLat=this.childsdatalist[0].Slat;
    this.schoolLong=this.childsdatalist[0].Slng;
    this.Homelat=this.childsdatalist[0].Ulat;
    this.Homelong=this.childsdatalist[0].Ulng;
    this.currentlocation.ref('/currentLocation/').on('value',arr=>{
       this.list= snapshotToArray(arr);
       this.currentLat=this.list[0].lat;
       this.currentlong=this.list[0].long;
       //console.log(this.currentlong+","+this.Homelong);
  this.distancefromschoolinMeters=this.distanceInKmBetweenEarthCoordinates( this.currentLat,this.currentlong,this.schoolLat,this.schoolLong)*1000;
  this.distancefromHomeinMeters=this.distanceInKmBetweenEarthCoordinates( this.currentLat,this.currentlong,this.Homelat,this.Homelong)*1000;
  console.log( this.distancefromHomeinMeters);
        if(this.distancefromschoolinMeters<=100&& this.flag1==0 ){
          this.localNotifications.schedule({     
            id:3000,
            title: 'Message From Your Child ',
            text: "your child is at school"
          });
          this.flag1=1;
        } 
        if(this.distancefromschoolinMeters>100&& this.flag1==1 ){
          this.localNotifications.schedule({
            id:3000,
            title: 'Message From Your Child ',
            text: "your child is leaving school"
          });
          this.flag1=0;
        } 
        if( this.distancefromHomeinMeters<=100&&this.flag2==0){
          this.localNotifications.schedule({
            id:3001,
            title: 'Message From Your Child ',
            text: "your child is at Home"
          });
          this.flag2=1;
        }
        if(this.distancefromHomeinMeters>100&& this.flag2==1 ){
          this.localNotifications.schedule({
            id:3000,
            title: 'Message From Your Child ',
            text: "your child is leaving home"
          });
          this.flag2=0;
        } 
    })
  });
}  

notify(){
}
 degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

 distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = this.degreesToRadians(lat2-lat1);
  var dLon =  this.degreesToRadians(lon2-lon1);

  lat1 =  this.degreesToRadians(lat1);
  lat2 =  this.degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return earthRadiusKm * c;
}
 
 //----------------------------------------------------------------------------------------------------------------------------
fun=setInterval(this.notifyNotes.bind(this), 3000);
fun2=setInterval(this.notifyLocation.bind(this), 3000);



}
