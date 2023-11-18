import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BatchListPageRoutingModule } from './batch-list-routing.module';

import { BatchListPage } from './batch-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BatchListPageRoutingModule
  ],
  declarations: [BatchListPage]
})
export class BatchListPageModule {}
