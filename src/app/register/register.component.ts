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
  showSecound = false;
  loginError= false;

  member: Member = {
    memberId: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    mobileNo: '',
    forgetPasswordAnswer: '',
    confirmPassword: ''
  };

  constructor(private memberService: MemberService, private router: Router) {}

  ngOnInit() {
   
  }

  onSubmit() {
    console.log(this.member)
    
  }

  onNext() {
   this.memberService.checkMemberEmail(this.member).subscribe({
    next:(value)=>{
        console.log( "from Next",value)
        this.loginError = true
    },
    error:(err)=>{
      this.showSecound  = true
        console.log(err)
    },
   })
   

  }
}
