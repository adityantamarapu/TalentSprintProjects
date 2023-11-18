import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PointsDataService } from '../services/points-data.service';
import { ModalController } from '@ionic/angular';
import { ActivityModalComponent } from '../activity-modal/activity-modal.component';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.page.html',
  styleUrls: ['./activity-list.page.scss'],
})
export class ActivityListPage implements OnInit {
  courseName: string;
  newActivityName: string = '';
  activities: any[] = [];
  batchName: string;
  studentIndex: number;
  isExpanded: boolean = false;
  expandTimeOut: any;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private pointsDataService: PointsDataService,
    private modalController: ModalController
  ) {
    this.courseName = this.route.snapshot.paramMap.get('courseName') || 'Back';
    this.batchName = this.route.snapshot.paramMap.get('batchName')!;
    this.studentIndex = +this.route.snapshot.paramMap.get('studentIndex')!;

    //console.log(this.batchName, this.studentIndex, this.courseName);
  }

  ngOnInit() {
    // Access route parameters for batch name, student index, and course name

    // Load existing activities using route parameters
    this.activities = this.pointsDataService.getActivities(
      this.batchName,
      this.studentIndex,
      this.courseName!
    );
  }

  async addActivityPoints() {
    if(!this.newActivityName.trim()) return;
    // const alert = await this.alertController.create({
    //   header: `Add Points for ${this.newActivityName}?`,
    //   buttons: [
    //     {
    //       text: '5',
    //       handler: () => {
    //         const newActivity = {
    //           name: this.newActivityName,
    //           date: new Date(),
    //           points: 5,
    //         };
    //         this.pointsDataService.addActivity(this.batchName, this.studentIndex, this.courseName, newActivity);
    //         //this.activities.push(newActivity);
    //       },
    //     },
    //     {
    //       text: '10',
    //       handler: () => {
    //         const newActivity = {
    //           name: this.newActivityName,
    //           date: new Date(),
    //           points: 10,
    //         };
    //         this.pointsDataService.addActivity(this.batchName, this.studentIndex, this.courseName, newActivity);
    //         //this.activities.push(newActivity);
    //       },
    //     },
    //     {
    //       text: '15',
    //       handler: () => {
    //         const newActivity = {
    //           name: this.newActivityName,
    //           date: new Date(),
    //           points: 15,
    //         };
    //         this.pointsDataService.addActivity(this.batchName, this.studentIndex, this.courseName, newActivity);
    //         //this.activities.push(newActivity);
    //       },
    //     },
    //     {
    //       text: '20',
    //       handler: () => {
    // const newActivity = {
    //   name: this.newActivityName,
    //   date: new Date(),
    //   points: 20,
    // };
    // this.pointsDataService.addActivity(this.batchName, this.studentIndex, this.courseName, newActivity);
    //         //this.activities.push(newActivity);
    //       },
    //     },
    //   ],
    // });

    // await alert.present();
    const modal = await this.modalController.create({
      component: ActivityModalComponent,
      componentProps: {
        newActivityName: this.newActivityName,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'ok') {
        const selectedPoints = data.data;
        // Handle the selected points (e.g., add points to your model)
        this.addActivity(selectedPoints);
      }
    });

    await modal.present();
  }

  addActivity(selectedPoints: number) {
    const newActivity = {
      name: this.newActivityName,
      date: new Date(),
      points: selectedPoints,
    };
    this.pointsDataService.addActivity(
      this.batchName,
      this.studentIndex,
      this.courseName,
      newActivity
    );
  }

  async addMorePoints(activity: any) {
    const modal = await this.modalController.create({
      component: ActivityModalComponent,
      componentProps: {
        newActivityName: activity.name, // Pass the activity name to the modal
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.role === 'ok') {
        const selectedPoints = data.data;
        // Handle the selected points (e.g., add points to the activity)
        if (selectedPoints) {
          if (
            !this.pointsDataService.updateActivityPoints(
              this.batchName,
              this.studentIndex,
              this.courseName,
              activity.name,
              selectedPoints
            )
          ) {
            // console.log('updating points failed');
          }
        }
      }
    });

    await modal.present();
  }

  expandName() {
    this.isExpanded = !this.isExpanded;
    clearTimeout(this.expandTimeOut);
    this.expandTimeOut = setTimeout(() => {
      this.isExpanded = false;
    }, 3000);
  }
}
