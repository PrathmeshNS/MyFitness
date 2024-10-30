import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendace } from '../entity/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {


  private api = "http://localhost:8080/attendance/"
  constructor(private http: HttpClient) { }


  insertInTime(memberId: number) {
    return this.http.get(`${this.api + 'insertInTime'}/${memberId}`);
  }

  insertOutTime(memberId: number) {
    return this.http.get(`${this.api + 'insertOutTime'}/${memberId}`);
  }

  getAllRecord():Observable<any>{
    return this.http.get(this.api+'getAllAttendance')
  }

}
