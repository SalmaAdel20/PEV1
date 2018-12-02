import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from '../register/register';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
@ViewChild('Email') Email;
@ViewChild('password') password;
Register:any;
  private myForm: FormGroup;
  constructor(private fire:AngularFireAuth,public navCtrl: NavController,
     public navParams: NavParams,public formBuilder: FormBuilder,private alertCtrl: AlertController) {
    this.Register = RegisterPage;
   
    this.myForm = formBuilder.group({
   
     
      Email: ['', [Validators.required,Validators.email] ],
      password: ['',Validators.compose([Validators.maxLength(30),Validators.minLength(10), Validators.required])]
     
  });
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Email or password!',
      subTitle: 'The Email or password you have entered is wrong ,please enter a valid email or password ,or sign up to make a new account . ',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  login(){
this.fire.auth.signInWithEmailAndPassword(this.Email.value,this.password.value)
.then(data=>{
  console.log('got some data',this.fire.auth.currentUser)
  this.navCtrl.setRoot(TabsPage);
}
  
  )
.catch(error =>{console.log('got error',error)
this.presentAlert();});

//console.log(this.Uname.value,this.Upassword.value);
} 

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
