import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingDetails, UserBooking } from '../model/userBookingModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userDetailsSource = new BehaviorSubject<string>('');
  userDetails = this.userDetailsSource.asObservable();

  private bookingDetailSource = new BehaviorSubject<any>([]);
  bookingDetails = this.bookingDetailSource.asObservable();

  private userMeetingRoomSource = new BehaviorSubject<any>([])
  userMeetingRooms = this.userMeetingRoomSource.asObservable();
  constructor() { }
  
  getUserDetails(message: string) {
    this.userDetailsSource.next(message);
  }
  getBookingDetails(bookingDetail: UserBooking) {
    this.bookingDetailSource.next(bookingDetail)
  }
  setCurrentUserMeetingDetails(userBookedRooms: BookingDetails[]) {
    this.userMeetingRoomSource.next(userBookedRooms)
  }
}
