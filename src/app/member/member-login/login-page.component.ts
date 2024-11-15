import { Component } from '@angular/core';
import { Member } from '../../entity/member';
import { MemberService } from '../../services/member.service';
import { Route, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { StorageService } from 'src/app/services/storage-service.service';

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
  count = 0;

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

  constructor(private memberService: MemberService, private router: Router, private encryptDecryptService: EncryptDecryptService, private localStorageService: StorageService) {
    if (localStorage.getItem("memberEmail") != null) {
      this.autoLogin()
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.memberService.loginMember(this.member).subscribe({
      next: (value) => {
        if (value != null) {
          this.setLocalStorage()
          this.memberService.serviceMemberData = value;
          this.router.navigate(['member/view']);
          if (this.count == 0) {
            this.count++;
          }
        }
        else {
          this.loginError = false
        }
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
    this.localStorageService.setItemWithExpiry("memberEmail", this.member.email, 900000)
    this.localStorageService.setItemWithExpiry("memberPassword", this.member.password, 900000)
  }

  private autoLogin() {

    const email = this.localStorageService.getItem("memberEmail");
    const password = this.localStorageService.getItem("memberPassword")

    if (email != null && password != null) {
      this.member.email = email.toString();
      this.member.password = password.toString()
      this.onSubmit()
    }
    else {
      console.log("Member Not Found!!")
    }
  }
}
