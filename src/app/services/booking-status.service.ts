import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingStatusService {

  private api = "http://localhost:8080/bookingStatus/"
  constructor(private http:HttpClient) { }
}
