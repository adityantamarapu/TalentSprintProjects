import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentStatsPage } from './student-stats.page';

const routes: Routes = [
  {
    path: '',
    component: StudentStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentStatsPageRoutingModule {}
