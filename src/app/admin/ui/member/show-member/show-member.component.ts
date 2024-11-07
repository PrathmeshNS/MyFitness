import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin/service/admin.service';
import { Member } from 'src/app/entity/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-show-member',
  templateUrl: './show-member.component.html',
  styleUrls: ['./show-member.component.css']
})
export class ShowMemberComponent {

  memberData: Member[] = [];
  

  constructor(private adminMemberService: MemberService, private router: Router, private activeRoute: ActivatedRoute, private adminService:AdminService) { }

  ngOnInit(): void {
    if (this.adminService.adminServiceData.adminEmail.length <= 0) {
      alert("Your Are not Known to me, please login as admin")
      this.router.navigate(['admin'])
    }
    else {
      this.adminMemberService.getAllMember().subscribe({
        next: (value) => {
          this.memberData = value
        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }


  goBack() { 
    this.router.navigate(['admin/adminView'])
  }
}
