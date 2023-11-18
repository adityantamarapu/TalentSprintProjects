import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PointsDataService {
  // Define the data structure
  data!: { batches: Batch[] };

  constructor() {
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    //console.log('saved to local storage.');
    localStorage.setItem('pointsData', JSON.stringify(this.data));
  }

  loadFromLocalStorage(){
    const storedData = localStorage.getItem('pointsData');
    if(storedData){
      this.data= JSON.parse(storedData);
    }else{
      this.data = {
        batches: [
          {
            name: 'FSD-55',
            students: [
              {
                name: 'Student 1',
                courses: [
                  {
                    name: 'Aptitude Skills',
                    activities: [
                      {
                        name: 'Activity 1',
                        date: new Date(),
                        points: 0,
                      },
                    ],
                  },
                  {
                    name: 'Corporate Skills',
                    activities: [
                      {
                        name: 'Activity 2',
                        date: new Date(),
                        points: 0,
                      },
                    ],
                  },
                  {
                    name: 'Technical Skills',
                    activities: [
                      {
                        name: 'Activity 3',
                        date: new Date(),
                        points: 0,
                      },
                    ],
                  },
                ],
              },
              // Add more students...
            ],
          },
          {
            name: 'FSD-54',
            students: [
              {
                name: 'Student 3',
                courses: [
                  {
                    name: 'Course A',
                    activities: [
                      {
                        name: 'Activity X',
                        date: new Date(),
                        points: 0,
                      },
                    ],
                  },
                  {
                    name: 'Course B',
                    activities: [
                      {
                        name: 'Activity Y',
                        date: new Date(),
                        points: 0,
                      },
                    ],
                  },
                ],
              },
              // Add more students...
            ],
          },
          // Add more batches...
        ],
      };
    }
  }

  createBatch(newBatchName: string): void {
    // Create a new batch with the given name and an empty list of students
    this.data.batches.push({
      name: newBatchName,
      students: [],
    });

    this.saveToLocalStorage();
  }

  // Methods to access and modify the data
  getBatches() {
    return this.data.batches.map((batch) => batch.name);
  }

  createStudent(batchName: string, studentName: string): void {
    // Find the batch with the given name
    const batch = this.data.batches.find((batch) => batch.name === batchName);

    if (batch) {
      // Create a new student with the provided name and an empty list of courses
      const newStudent = {
        name: studentName,
        courses: [],
      };

      // Append the new student to the students array of the batch
      batch.students.push(newStudent);

      this.saveToLocalStorage();
    }
  }

  getStudentInfo(
    batchName: string
  ): { studentID: number; studentName: string }[] {
    const batch = this.data.batches.find((batch) => batch.name === batchName);
    if (batch) {
      return batch.students.map((student, index) => ({
        studentID: index,
        studentName: student.name,
      }));
    } else {
      // Return an empty array or handle the case when the batch with the given name is not found
      return [];
    }
  }

  createCourse(batchName: string, studentIndex: number, newCourseName: string): void {
    const batch = this.data.batches.find((batch) => batch.name === batchName);
  
    if (
      batch &&
      batch.students[studentIndex]
    ) {
      const newCourse = {
        name: newCourseName,
        activities: [],
      };
      batch.students[studentIndex].courses.push(newCourse);
  
      this.saveToLocalStorage();
    }
  }  

  getCourses(batchName: string, studentIndex: number): string[] {
    const batch = this.data.batches.find((batch) => batch.name === batchName);

    if (batch) {
      return batch.students[studentIndex].courses.map((course) => course.name);
    } else {
      // Handle the case when the batch with the given name is not found
      return [];
    }
  }

  // Implement methods to update the data (e.g., adding/removing points)
  // addActivity(
  //   batchName: string,
  //   studentIndex: number,
  //   courseName: string,
  //   newActivity: {name: string, date: Date, points: number}
  // ): number {
  //   const batch = this.data.batches.find((batch) => batch.name === batchName);

  //   if (
  //     batch &&
  //     batch.students[studentIndex] &&
  //     batch.students[studentIndex].courses.find(
  //       (course) => course.name === courseName
  //     )
  //   ) {
  //     const course = batch.students[studentIndex].courses.find(
  //       (course) => course.name === courseName
  //     );
  //     if (course) {
  //       course.points += points;
  //       return course.points;
  //     }
  //   }

  //   return 0;
  // }

  // removePoints(
  //   batchName: string,
  //   studentIndex: number,
  //   courseName: string,
  //   newActivity: {name: string, date: Date, points: number}
  // ): number {
  //   const batch = this.data.batches.find((batch) => batch.name === batchName);

  //   if (
  //     batch &&
  //     batch.students[studentIndex] &&
  //     batch.students[studentIndex].courses.find(
  //       (course) => course.name === courseName
  //     )
  //   ) {
  //     const course = batch.students[studentIndex].courses.find(
  //       (course) => course.name === courseName
  //     );
  //     if (course) {
  //       course.points -= points;
  //       return course.points;
  //     }
  //   }

  //   return 0;
  // }

  addActivity(
    batchName: string,
    studentIndex: number,
    courseName: string,
    newActivity: { name: string; date: Date; points: number }
  ): void {
    const batch = this.data.batches.find((batch) => batch.name === batchName);

    if (
      batch &&
      batch.students[studentIndex] &&
      batch.students[studentIndex].courses.find(
        (course) => course.name === courseName
      )
    ) {
      const course = batch.students[studentIndex].courses.find(
        (course) => course.name === courseName
      );
      if (course) {
        course.activities.push(newActivity);

        this.saveToLocalStorage();
      }
    }
  }

  getActivities(batchName: string, studentIndex: number, courseName: string): { name: string; date: Date; points: number }[] {
    const batch = this.data.batches.find((batch) => batch.name === batchName);
  
    if (
      batch &&
      batch.students[studentIndex] &&
      batch.students[studentIndex].courses.find(
        (course) => course.name === courseName
      )
    ) {
      const course = batch.students[studentIndex].courses.find(
        (course) => course.name === courseName
      );
      if (course) {
        return course.activities;
      }
    }
  
    return [];
  }

  updateActivityPoints(
    batchName: string,
    studentIndex: number,
    courseName: string,
    activityName: string,
    newPoints: number
  ): boolean {

    //console.log('adding activity points: ', batchName, studentIndex, courseName, activityName, newPoints);

    const batch = this.data.batches.find((batch) => batch.name === batchName);
  
    if (
      batch &&
      batch.students[studentIndex] &&
      batch.students[studentIndex].courses.find(
        (course) => course.name === courseName
      )
    ) {
      const course = batch.students[studentIndex].courses.find(
        (course) => course.name === courseName
      );
  
      if (course) {
        const activity = course.activities.find(
          (act) => act.name === activityName
        );
  
        if (activity) {
          activity.points += newPoints;
          this.saveToLocalStorage();
          return true;
        }
      }
    }
    return false;
  }
  
  
}

interface Batch {
  name: string;
  students: Student[];
}

interface Student {
  name: string;
  courses: Course[];
}

interface Course {
  name: string;
  activities: { name: string; date: Date; points: number }[];
}
