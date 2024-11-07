import { Component } from '@angular/core';
import { Admin } from 'src/app/entity/admin';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  adminData: Admin = {
    adminId: 0,
    adminName: '',
    adminEmail: "",
    adminPassword: ''
  }

  constructor(private adminService: AdminService, private router: Router, private encryptDecrypt: EncryptDecryptService) {
    this.autoLogin();
  }

  ogOnInit() {
  }

  onSubmit() {
    this.adminService.adminLogin(this.adminData).subscribe({
      next: (value) => {
        if (value != null) {
          this.adminService.adminServiceData = value;
          this.router.navigate(['admin/adminView'])
          this.settingUpLocalStorage()
        }
      },
      error: (err) => {
        console.log("unknown Login")
      }
    })
  }

  private settingUpLocalStorage() {
    const uName = this.encryptDecrypt.encryption(this.adminData.adminEmail);
    const uPass = this.encryptDecrypt.encryption(this.adminData.adminPassword);
    localStorage.setItem("uName", uName)
    localStorage.setItem("uPass", uPass)
  }

  private autoLogin() {
    if (localStorage.length >= 0) {
      const uName = localStorage.getItem("uName")
      const uPass = localStorage.getItem("uPass")
      this.adminData.adminEmail = this.encryptDecrypt.decryption(uName)
      this.adminData.adminPassword = this.encryptDecrypt.decryption(uPass)
      this.onSubmit()
    }
  }
}
