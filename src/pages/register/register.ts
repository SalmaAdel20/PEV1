import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl  } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {


@ViewChild('Email') Email;
@ViewChild('password') password;
@ViewChild('confirmPassword') confirmPass;
Login:any; 
private myForm: FormGroup;



  constructor(private fire:AngularFireAuth,public navCtrl: NavController, 
    public navParams: NavParams,public formBuilder: FormBuilder,private alertCtrl: AlertController) {
    this.Login=LoginPage;
    this.myForm = formBuilder.group({
   
     
      Email: ['', [Validators.required,Validators.email] ],
      password: ['',Validators.compose([Validators.maxLength(30),Validators.minLength(10), Validators.required])],
      confirmPassword: ['',Validators.compose([Validators.maxLength(30),Validators.minLength(10), Validators.required,this.checkIfMatchingPasswords('password')])]
     
  });
    
  } 
  
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email already exists !',
      subTitle: 'The Email you have entered already exists try another one or login . ',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  submitForm(){  
    
     this.fire.auth.createUserWithEmailAndPassword(this.Email.value,this.password.value)
     .then(data=>{
      console.log('got some data',this.fire.auth.currentUser)
      this.navCtrl.setRoot(TabsPage);
    }
      
      ) 
    
    .catch(error =>{console.log('got error',error)
    this.presentAlert();
  
  });
    
    } 
    
   checkIfMatchingPasswords(passwordKey: string): ValidatorFn {
    
     return (control: AbstractControl): {[key: string]: any} => {

      let input = control.value;
      
      let isValid=control.root.value[passwordKey]==input
      if(!isValid){
      return { 'equalTo': {isValid} } }
      else

      
      return null;
      };
     
    }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
