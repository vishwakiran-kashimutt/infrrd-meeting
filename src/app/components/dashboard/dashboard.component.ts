import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingDetails, UserBooking } from 'src/app/model/userBookingModel';
import { DataService } from 'src/app/service/data.service';
import { UserMeetingService } from 'src/app/service/user-meeting.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  agendaEntries: any = [];
  @ViewChild('modal') modal!: ModalComponent;
  constructor(
    private dataService: DataService,
    private userMeetingService: UserMeetingService
  ) {}
  ngOnInit() {
    this.dataService.bookingDetails.subscribe((resp: UserBooking[]) => {
      if (resp?.length) {
        this.agendaEntries = [...resp];
      }
    });
    this.dataService.userMeetingRooms.subscribe((resp: BookingDetails[]) => {
      if (resp?.length) {
        this.agendaEntries = [...resp];
      }
    });
  }
 
  /**
   * Opens modal on click on Book meeting
   */
  openModal() {
    this.modal.openModal();
  }

  /**
   * 
   * get the status of close event passed from the modal and get the latest booking values
   */
  getSubmitStatus(event: any) {
    if (event) {
      this.userMeetingService.booking$.subscribe((resp: UserBooking[]) => {
        if (resp?.length > 0) {
          this.agendaEntries = resp;
        }
      });
      this.modal.closeModal();
    }
  }
}
