import { Component } from '@angular/core';
import { BookingStatusService } from 'src/app/services/booking-status.service';

@Component({
  selector: 'app-show-booking',
  templateUrl: './show-booking.component.html',
  styleUrls: ['./show-booking.component.css']
})


export class ShowBookingComponent {

  constructor(private bookingStatus:BookingStatusService){}





  reject() {
    
  }
  approve() {

  }

}
