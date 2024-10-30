import { Component } from '@angular/core';
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

  attendance:Attendace[] =[];

  memberDetails: Member[] =[];

  showAttendance = false;

  constructor(private memberService:MemberService,private attendanceService:AttendanceService){
    memberService.getAllMember().subscribe({
      next:(value)=>{
        this.memberDetails = value
      },
      error:(err)=>{
      },
    })
  }

  ngOnInit() {
    console.log(new Date());
    this.getAllAttendance()
  }
  outTime(id:number) {
    console.log(id)
  }
  inTime(id:number) {
    console.log(id)
  }


  getAllAttendance(){
    this.attendanceService.getAllRecord().subscribe({
      next:(value)=>{
        this.attendance = value;
        console.log(value)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
