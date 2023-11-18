import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StudentStatsPageRoutingModule } from './student-stats-routing.module';

import { StudentStatsPage } from './student-stats.page';
import { ReportModalComponent } from '../report-modal/report-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentStatsPageRoutingModule,
  ],
  declarations: [StudentStatsPage, ReportModalComponent]
})
export class StudentStatsPageModule {}
