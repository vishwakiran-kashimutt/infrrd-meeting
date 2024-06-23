import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  display: boolean = false;

  openModal() {
    this.display = true;
  }

  closeModal(event?: any) {
    this.display = false;
  }
}
