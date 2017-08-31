import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrayerDetailsPage } from './prayer-details';

@NgModule({
  declarations: [
    PrayerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PrayerDetailsPage),
  ],
})
export class PrayerDetailsPageModule {}
