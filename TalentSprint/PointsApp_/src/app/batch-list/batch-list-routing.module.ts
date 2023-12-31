import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatchListPage } from './batch-list.page';

const routes: Routes = [
  {
    path: '',
    component: BatchListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchListPageRoutingModule {}
