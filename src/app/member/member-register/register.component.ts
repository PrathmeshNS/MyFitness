import { Component } from '@angular/core';
import { Member } from '../../entity/member';
import { MemberService } from '../../services/member.service';
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

  onSubmit() {
      this.memberService.insertMember(this.member).subscribe({
        next:(value)=> {
          console.log(value)
            this.router.navigate(['/login'])
        },
        error:(err)=>{
            console.log(err)
        },
      })    
  }

  onNext() {
   this.memberService.checkMemberEmail(this.member).subscribe({
    next:(value)=>{
       if(value){
        this.showSecound= true;
      }
      // alert("The Email You Enter That Already Exits!!")
      this.loginError = true
    },
    error:(err)=>{
      this.showSecound  = true
        console.log(err)
    },
   })
   

  }
}
