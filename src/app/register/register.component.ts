import { Component } from '@angular/core';
import { Member } from '../entity/member';
import { MemberService } from '../services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  emailExits = ''
  genderError =""
  showForgetPasswordContent = false;
  memberData: Member = {
    memberId: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    forgetPasswordAnswer: '',
    mobileNo: '',
    gender: '',
    confirmPassword: ''
  };

  constructor(private memberService: MemberService, private router:Router) {}

  goNext() {
    this.memberService.checkMemberEmail(this.memberData).subscribe({
      next: (response) => {
        this.emailExits = "Email Already Exits In Database!!"
      },
      error: (err) => {
        this.showForgetPasswordContent = true;
      },
    });
  }

  onSubmit() {
    if (this.memberData.gender.length>0) {
      this.memberService.insertMember(this.memberData).subscribe({
        next: (response) => { 
        },
        error: (err) => {
          this.router.navigate(['login'])
        }
      }); 
    }
    else {
      this.genderError = "gender is required"
    }
  }

  showForgetPassword() {}
}
