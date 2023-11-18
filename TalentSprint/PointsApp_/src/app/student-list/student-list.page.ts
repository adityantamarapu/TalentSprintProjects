import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PointsDataService } from '../services/points-data.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {
  batchName: string = 'Back';
  students: { studentID: number, studentName: string }[] = [];
  filteredStudents: { studentID: number, studentName: string }[] = [];
  searchTerm: string = '';
  loading!: HTMLIonLoadingElement;
  newStudentName: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private pointsDataService: PointsDataService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Get the batch name from the route parameters
    this.batchName = this.route.snapshot.paramMap.get('batchName') || 'Back';
    this.students = this.pointsDataService.getStudentInfo(this.batchName);
    // Initialize the filteredStudents with all students
    this.filteredStudents = this.students;
  }

  searchStudents() {
    // Filter students based on the search term
    this.filteredStudents = this.students.filter((student) => {
      return student.studentName.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  async createStudent() {
    if (this.newStudentName.trim()) {

      if (this.students.some((student) => student.studentName.toLowerCase() === this.newStudentName.toLowerCase())) {
        // Student name already exists, show an error message
        const alert = await this.alertController.create({
          header: 'Error',
          message: `A student with the name "${this.newStudentName}" already exists in the batch.`,
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      const confirmationAlert = await this.alertController.create({
        header: 'Confirm',
        message: `Are you sure you want to create a new student with the name: ${this.newStudentName}?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Create',
            handler: () => {
              // Call the createBatch function from the service
              this.pointsDataService.createStudent(this.batchName, this.newStudentName);
  
              // Clear the input field
              this.newStudentName = '';
  
              // Refresh the batch list
              this.refreshStudents();
            },
          },
        ],
      });
  
      await confirmationAlert.present();
    }
  } 

  async refreshStudents() {
    await this.presentLoading();
    try {
      this.students = this.pointsDataService.getStudentInfo(this.batchName);
      this.filteredStudents = this.students; // Update the filtered list
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      this.dismissLoading();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
