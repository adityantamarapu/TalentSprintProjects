import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.scss'],
})
export class ActivityModalComponent  implements OnInit {

  @Input() newActivityName!: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async addPoints(points: number) {
    // Dismiss the modal and pass the selected points back to the caller
    await this.modalController.dismiss(points, 'ok');
  }

  dismissModal() {
    // Dismiss the modal without passing any data
    this.modalController.dismiss(null, 'cancel');
  }
  
}
