import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityListPageRoutingModule } from './activity-list-routing.module';

import { ActivityListPage } from './activity-list.page';
import { ActivityModalComponent } from '../activity-modal/activity-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityListPageRoutingModule
  ],
  declarations: [ActivityListPage,ActivityModalComponent]
})
export class ActivityListPageModule {}
