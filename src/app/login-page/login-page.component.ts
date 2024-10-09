import { Component } from '@angular/core';
import { Member } from '../entity/member';
import { MemberService } from '../services/member.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  showLogin = true;
  showForgetSection = true;
  email: any;
  password: any;
  msg = true;
  loginError = true;
  confirmPassword= true;

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
    if (localStorage.length > 0) {
      this.setLocalStorage();
      this.onSubmit();
    }
  }

  onSubmit() {
    this.memberService.loginMember(this.member).subscribe({
      next: (value) => {
        localStorage.setItem('email', this.member.email);
        localStorage.setItem('password', this.member.password);
        console.log('after Setting the values : ', this.member);
        this.memberService.serviceMemberData = value;
        this.router.navigate(['member']);
      },
      error: (err) => {
        console.log(err);
        this.loginError = false
      },
    });
  }

  onCheck() {
    this.memberService.checkForgetPassword(this.member).subscribe({
      next: (value) => {
        console.log(value);
        this.showForgetSection = false;
        this.member.password = "";
      },
      error: (err) => {
        console.log(err);
        this.msg = false;
      },
    });
  }

  onChangePassword() {
    if (this.member.password.match(this.member.confirmPassword)) {
      this.memberService.updatePassword(this.member).subscribe({
        next: (value) => {
          console.log(value);
          this.showLogin = true
          this.member.email = ""
          this.member.password = ""
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    else{
      this.confirmPassword = false
    }
  }

  setLocalStorage() {
    this.email = localStorage.getItem('email');
    this.password = localStorage.getItem('password');
    this.member.email = this.email.toString();
    this.member.password = this.password.toString();
  }
}
