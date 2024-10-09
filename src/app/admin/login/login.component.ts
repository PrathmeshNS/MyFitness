import { Component } from '@angular/core';
import { Admin } from 'src/app/entity/admin';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

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

  constructor(private adminService: AdminService, private router:Router) { }


  onSubmit() {
    console.log(this.adminData)
    this.adminService.adminLogin(this.adminData).subscribe({
      next: (value) => {
        this.adminService.adminServiceData = value;
        this.router.navigate(['admin/adminView'])
      },
      error: (error) => {
        console.log("from error : ", error)
       }
    })
  }




}
