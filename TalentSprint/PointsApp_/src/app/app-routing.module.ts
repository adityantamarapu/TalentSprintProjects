import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'batch-list',
    loadChildren: () => import('./batch-list/batch-list.module').then( m => m.BatchListPageModule)
  },
  {
    path: 'batch-list/:batchName',
    loadChildren: () => import('./student-list/student-list.module').then( m => m.StudentListPageModule)
  },
  {
    path: 'student-stats/:studentID/:studentName/:batchName',
    loadChildren: () => import('./student-stats/student-stats.module').then( m => m.StudentStatsPageModule)
  },
  {
    path: 'course-list/:batchName/:studentIndex/:courseName',
    loadChildren: () => import('./activity-list/activity-list.module').then( m => m.ActivityListPageModule)
  },
  {
    path: '',
    redirectTo: 'batch-list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
