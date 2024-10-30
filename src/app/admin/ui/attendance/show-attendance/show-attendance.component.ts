import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Attendace } from 'src/app/entity/attendance';
import { Member } from 'src/app/entity/member';
import { AttendanceService } from 'src/app/services/attendance.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-show-attendance',
  templateUrl: './show-attendance.component.html',
  styleUrls: ['./show-attendance.component.css'],
})
export class ShowAttendanceComponent {

  attendance: Attendace[] = [];

  memberDetails: Member[] = [];

  showAttendance = false;

  constructor(private memberService: MemberService, private attendanceService: AttendanceService, private router:Router) {
    memberService.getAllMember().subscribe({
      next: (value) => {
        this.memberDetails = value
      },
      error: (err) => {
      },
    })
  }

  ngOnInit() {
    this.getAllAttendance()
  }

 
  inTime(id: number, firstName:string) {
    this.attendanceService.insertInTime(id).subscribe({
      next: (value) => {
        alert(" In Time of "+ firstName +" Added Successfully!!")
        this.reloadPage()
      },
      error: (err) => {
        alert("Some Error Occcure While Performing the Operation!!")

      },
    })
  }

  outTime(id: number, firstName:string) {
    this.attendanceService.insertOutTime(id).subscribe({
      next: (value) => {
        alert(" Out Time of "+ firstName +" Added Successfully!!")
        this.reloadPage()
      },
      error: (err) => {
        alert("Some Error Occcure While Performing the Operation!!")
      },
    })
  }

  getAllAttendance() {
    this.attendanceService.getAllRecord().subscribe({
      next: (value) => {
        this.attendance = value;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  goBack(){
    this.router.navigate(['admin/adminView'])
  }

  reloadPage(){
    window.location.reload()
  }
}
