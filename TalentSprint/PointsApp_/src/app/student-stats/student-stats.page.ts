import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PointsDataService } from '../services/points-data.service';
import { ReportModalComponent } from '../report-modal/report-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-student-stats',
  templateUrl: './student-stats.page.html',
  styleUrls: ['./student-stats.page.scss'],
})
export class StudentStatsPage implements OnInit {
  student: any = {};
  courses: string[];
  batchName: string;
  newCourseName!: string;

  // radarChartData: any[] = [];
  // radarChartLabels: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private pointsDataService: PointsDataService,
    private modalController: ModalController
  ) {
    const studentID: number = Number(
      this.route.snapshot.paramMap.get('studentID')
    );
    const studentName = this.route.snapshot.paramMap.get('studentName');
    this.batchName = String(this.route.snapshot.paramMap.get('batchName'));

    this.courses = this.pointsDataService.getCourses(this.batchName, studentID);

    this.student = { studentID, studentName };
    
  }

  ngOnInit() {
    // this.radarChartData = [
    //   { data: this.courses.map(course => course.points), label: 'Course Points' }
    // ];
    // this.radarChartLabels = this.courses.map(course => course.courseName);

    this.courses = this.pointsDataService.getCourses(this.batchName, this.student.studentID);
  }

  async createCourse() {
    if (this.newCourseName.trim()) {

      if (this.courses.includes(this.newCourseName)) {
        // Course name already exists, show an error message
        const alert = await this.alertController.create({
          header: 'Error',
          message: `A course with the name "${this.newCourseName}" already exists for the student.`,
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      // Call the createCourse function from the service
      this.pointsDataService.createCourse(this.batchName, this.student.studentID, this.newCourseName);
  
      // Clear the input field
      this.newCourseName = '';
  
      // Refresh the course list
      this.courses = this.pointsDataService.getCourses(this.batchName, this.student.studentID);
    }
  }
  
  async openReportModal() {
    const modal = await this.modalController.create({
      component: ReportModalComponent,
      componentProps: {
        courseData: this.calculateTotalPoints(), // You need to implement calculateTotalPoints function
        studentName: this.student.studentName
      },
    });
  
    await modal.present();
  }

  calculateTotalPoints() {
    const totalPoints: any = {};

    // Initialize total points for each course to 0
    this.courses.forEach((course) => {
      totalPoints[course] = 0;
    });

    // Iterate through the activities and accumulate points for each course
    this.courses.forEach((course) => {
      const activities = this.pointsDataService.getActivities(
        this.batchName,
        this.student.studentID,
        course
      );

      activities.forEach((activity) => {
        totalPoints[course] += activity.points;
      });
    });

    return totalPoints;
  }

  // async openConfirmDialog(action: string, course: any) {
  //   const alert = await this.alertController.create({
  //     header: action === 'add' ? 'Add Points' : 'Remove Points',
  //     message: `Enter the points to ${
  //       action === 'add' ? 'add to' : 'remove from'
  //     } ${course.courseName}:`,
  //     inputs: [
  //       {
  //         name: 'points',
  //         type: 'number',
  //         placeholder: 'Points',
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: (data) => {
  //           const pointsToAdd = parseInt(data.points, 10);
  //           if (!isNaN(pointsToAdd)) {
  //             if (action === 'add') {
  //               course.points = this.pointsDataService.addPoints(this.batchName, this.student.studentID, course.courseName, pointsToAdd);
  //               // console.log("added points. " , course.points);
  //             } else {
  //               course.points = this.pointsDataService.removePoints(this.batchName, this.student.studentID, course.courseName, pointsToAdd);
  //               // console.log("removed points. " , course.points);
  //             }
  //           }
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }
}
