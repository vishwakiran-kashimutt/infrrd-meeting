import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { Rooms } from 'src/app/model/userBookingModel';
import { DataService } from 'src/app/service/data.service';
import { UserMeetingService } from 'src/app/service/user-meeting.service';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent {
  meetingForm!: FormGroup;
  @ViewChild('modal') modal!: ModalComponent;
  @Output() submittedStatus = new EventEmitter<boolean>()
  rooms: Rooms[] = []; // List of rooms

  constructor(private fb: FormBuilder, private userMeetingServie: UserMeetingService, private dataService: DataService) { }

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      username: ['', Validators.required],
      meetingDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      room: ['', Validators.required],
      agenda: ['', Validators.required]
    });
    this.userMeetingServie.getAllRooms().subscribe({
      next: (response)=> {
        this.rooms = response;
      }
    })
  }
  /**
   * Emits a event when modal is submitted
   */
  sendStatus() {
    this.submittedStatus.emit(true);
  }
  /**
   * Make a post call to booking when user books new meeting
   */
  onSubmit() {
    const {username, meetingDate, startTime, endTime, room, agenda} = this.meetingForm.value;
    const time = `${startTime.toString()}-${endTime.toString()}` 
    const booking = {
      userName: username,
      date: meetingDate,
      time: time,
      room: Number(room),
      agenda: agenda,
      userId: Number(localStorage.getItem('userId'))
    }
    this.userMeetingServie.bookMeetings(booking).subscribe({
      next: ((response: any)=> {
        this.userMeetingServie.addMeeting(response);
        this.sendStatus()
      })
    })
  }
}
