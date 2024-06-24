import { Component, OnInit } from '@angular/core';
import { UserMeetingService } from './service/user-meeting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeader: boolean = false;
  constructor(private userMeetingService: UserMeetingService){}
  ngOnInit() {
    localStorage.removeItem('roles')
    localStorage.removeItem('userId')
    this.userMeetingService.getAllRoomDetails();
  }
  title = 'infrrd-meeting';
}
