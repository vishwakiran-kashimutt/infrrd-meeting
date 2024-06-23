import { Component, OnInit } from '@angular/core';
import {
  BookingDetails,
  Rooms,
  UserBooking,
} from 'src/app/model/userBookingModel';
import { DataService } from 'src/app/service/data.service';
import { UserMeetingService } from 'src/app/service/user-meeting.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit {
  selectedRoom!: number; // Selected room
  meetings: BookingDetails[] = [];
  existingRooms: string[] = [];
  currentRoomBooking: BookingDetails[] = [];
  allRooms: Rooms[] = [];
  // currentUserBookings: BookingDetails[] =[]
  constructor(
    private userMeetingService: UserMeetingService,
    private dataService: DataService
  ) {}
  ngOnInit() {
    this.userMeetingService.getAllRoomDetails();
    this.userMeetingService.booking$.subscribe({
      next: (response: any) => {
        this.meetings = response;
        this.userMeetingService.getAllRooms().subscribe((resp) => {
          this.allRooms = resp;
          this.selectedRoom = resp[0].roomId;
          this.getFilteredMeetings();
          this.getUserBookingDetails();
        });
      },
      error: (error) => {},
    });
  }

  /**
   * 
   * Triggers when we change the room
   */
  onRoomChange(event: any): void {
    this.selectedRoom = Number(event.target.value);
    this.getFilteredMeetings();
  }

  /**
   * 
   * This function helps in filtering the meetings for corresponding room
   */
  getFilteredMeetings(): BookingDetails[] {
    this.currentRoomBooking = [];
    this.meetings.filter((meeting) => {
      if (meeting.room === this.selectedRoom) {
        this.currentRoomBooking.push(meeting);
      }
    });

    return this.currentRoomBooking;
  }
  /**
   * This function filters out the bookings of user who is logged in
   */
  getUserBookingDetails() {
    const userId = localStorage.getItem('userId');
    let currentUserBooking: BookingDetails[] = [];
    this.meetings.filter((meeting) => {
      if (meeting.userId === Number(userId)) {
        currentUserBooking.push(meeting);
      }
    });
    this.userMeetingService.addMeeting(currentUserBooking);
    this.dataService.setCurrentUserMeetingDetails(currentUserBooking);
  }
}
