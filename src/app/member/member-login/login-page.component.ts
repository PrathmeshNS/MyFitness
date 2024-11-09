import { Component } from '@angular/core';
import { Member } from '../../entity/member';
import { MemberService } from '../../services/member.service';
import { Route, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  showLogin = true;
  showForgetSection = true;
  msg = true;
  loginError = true;
  confirmPassword = true;

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

  constructor(private memberService: MemberService, private router: Router, private encryptDecryptService: EncryptDecryptService) {
    if (localStorage.getItem("memberEmail") != null) {
      this.autoLogin()
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.memberService.loginMember(this.member).subscribe({
      next: (value) => {
        this.setLocalStorage()
        this.memberService.serviceMemberData = value;
        this.router.navigate(['member/view']);
      },
      error: (err) => {
        this.loginError = false
      },
    });
  }

  onCheck() {
    this.memberService.checkForgetPassword(this.member).subscribe({
      next: (value) => {
        this.showForgetSection = false;
        this.member.password = "";
      },
      error: (err) => {
        this.msg = false;
      },
    });
  }

  onChangePassword() {
    if (this.member.password.match(this.member.confirmPassword)) {
      this.memberService.updatePassword(this.member).subscribe({
        next: (value) => {
          this.showLogin = true
          this.member.email = ""
          this.member.password = ""
        },
        error: (err) => {
        },
      });
    }
    else {
      this.confirmPassword = false
    }
  }

  private setLocalStorage() {
    localStorage.setItem("memberEmail", this.encryptDecryptService.encryption(this.member.email));
    localStorage.setItem("memberPassword", this.encryptDecryptService.encryption(this.member.password));
  }

  private autoLogin() {
    if (localStorage.getItem("memberEmail") != null) {
      const email = localStorage.getItem("memberEmail");
      const password = localStorage.getItem("memberPassword");

      if (email != null && password != null) {
        this.member.email = this.encryptDecryptService.decryption(email.toString());
        this.member.password = this.encryptDecryptService.decryption(password.toString());
        console.log("email is : ", email, " and Password Is : ", password)
        this.onSubmit();
      }

    }
    else {
      console.log("Member Not Found ")
    }
  }
}
