import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserBooking } from '../model/userBookingModel';
import API from './api.constants';

@Injectable({
  providedIn: 'root'
})
export class UserMeetingService {

  private bookingSubject = new BehaviorSubject<any[]>([]);
  booking$ = this.bookingSubject.asObservable();

  constructor(private http: HttpClient) { }
  readonly baseURl = 'http://localhost:3000'
  bookMeetings(booking: UserBooking): Observable<UserBooking[]> {
    return this.http.post<any[]>(`${this.baseURl}${API.booking}`, booking)
  }

  getAllRoomDetails() {
    return this.http.get<any[]>(`${this.baseURl}${API.booking}`).subscribe(
      (data)=> {
        this.bookingSubject.next(data);
      }
    )
  }

  getAllRooms() {
    return this.http.get<any[]>(`${this.baseURl}${API.rooms}`)
  }
  addMeeting(newMeeting: any) {
    // Add the new meeting to the current list of meetings
    const currentMeetings = this.bookingSubject.getValue();
    this.bookingSubject.next([...currentMeetings, newMeeting]);
  }
}
