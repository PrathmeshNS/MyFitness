import { Component } from '@angular/core';
import { Member } from 'src/app/entity/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-show-attendance',
  templateUrl: './show-attendance.component.html',
  styleUrls: ['./show-attendance.component.css'],
})
export class ShowAttendanceComponent {
  getDate: any;
  memberDetails: Member[] =[];
  showAttendance = false;
  constructor(private memberService:MemberService){
    memberService.getAllMember().subscribe({
      next:(value)=>{
        this.memberDetails = value
      },
      error:(err)=>{
      },
    })

  }


  ngOnInit() {
    console.log(this.getDate);
  }
  outTime(id:number) {
    console.log(id)
  }
  inTime(id:number) {
    console.log(id)
  }
}
