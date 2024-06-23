export interface UserBooking {
    userName: string;
    agenda: string;
    date: string;
    time: string;
    room: number;
  }
  
  export interface BookingDetails {
    userName: string;
    agenda: string;
    date: string;
    time: string;
    userId: number;
    room: number;
  }

  export interface Rooms {
    roomName: string;
    roomId: number
  }