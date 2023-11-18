import { Component, OnInit } from '@angular/core';
import { PointsDataService } from '../services/points-data.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.page.html',
  styleUrls: ['./batch-list.page.scss'],
})
export class BatchListPage implements OnInit {
  batches: string[];
  filteredBatches: string[];
  searchQuery: string = '';
  newBatchName: string = ''; 
  loading: HTMLIonLoadingElement | undefined;

  constructor(
    private pointsDataService: PointsDataService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.batches = this.pointsDataService.getBatches();
    this.filteredBatches = this.batches;
  }

  ngOnInit() {}

  // Implement batch name search functionality
  searchBatches() {
    this.filteredBatches = this.batches.filter((batch) =>
      batch.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  onBatchNameChange() {
    // Update the uppercaseBatchName whenever the newBatchName changes
    this.newBatchName = this.newBatchName.toUpperCase();
  }

  async createBatch() {
    if (this.newBatchName.trim()) {

      if (this.batches.includes(this.newBatchName)) {
        // Batch name already exists, show an error message
        const alert = await this.alertController.create({
          header: 'Error',
          message: `A batch with the name "${this.newBatchName}" already exists.`,
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      const confirmationAlert = await this.alertController.create({
        header: 'Confirm',
        message: `Are you sure you want to create a new batch with the name: ${this.newBatchName}?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Create',
            handler: () => {
              // Call the createBatch function from the service
              this.pointsDataService.createBatch(this.newBatchName);
  
              // Clear the input field
              this.newBatchName = '';
  
              // Refresh the batch list
              this.refreshBatches();
            },
          },
        ],
      });
  
      await confirmationAlert.present();
    }
  }  

  async refreshBatches() {
    await this.presentLoading();
    try {
      this.batches = this.pointsDataService.getBatches();
      this.filteredBatches = this.batches;
    } catch (error) {
      console.error('Error fetching batches:', error);
    } finally {
      this.loading?.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',      
    });
    await this.loading.present();
  }
}
