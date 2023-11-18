import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss'],
})
export class ReportModalComponent implements AfterViewInit {
  @Input() courseData: { [courseName: string]: number } = {};
  @ViewChild('pieChart') pieChart!: ElementRef;
  // @ViewChild('lineChart') lineChart!: ElementRef;
  @Input() studentName: string = 'Student';
  loading!: boolean;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading Chart...',
      translucent: true,
    });
    await loading.present();
  }

  async dismissLoading() {
    const loading = await this.loadingController.getTop();
    if (loading) {
      await loading.dismiss();
    }
  }

  ngAfterViewInit() {
    if (this.pieChart) {
      this.createPieChart();
    }
    // if(this.lineChart){
    //   this.createLineChart();
    // }
  }

  async createPieChart() {
    await this.presentLoading(); // Show the loading spinner
    const chartData: ChartDataset = {
      data: Object.values(this.courseData),
      backgroundColor: [
        'red',
        'blue',
        'green',
        'yellow',
        'orange',
        'purple',
        'pink',
      ],
    };

    const chartOptions: ChartOptions = {
      responsive: true,
    };

    const chartLabels: string[] = Object.keys(this.courseData);

    const chart = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        datasets: [chartData],
        labels: chartLabels,
      },
      options: chartOptions,
    });

    // Set loading to false when the chart is created
    this.dismissLoading(); // Dismiss the loading spinner
  }

  closeModal() {
    this.modalController.dismiss();
  }

  
}
