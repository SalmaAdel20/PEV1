import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddChildPage } from './add-child';

@NgModule({
  declarations: [
    AddChildPage,
  ],
  imports: [
    IonicPageModule.forChild(AddChildPage),
  ],
})
export class AddChildPageModule {}
