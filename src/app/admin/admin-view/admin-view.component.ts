import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/entity/admin';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {

  adminDetails: Admin = {
    adminId: 0,
    adminName: "",
    adminEmail: "",
    adminPassword: ""
  }
noOfMember: any;
noOfTrainer: any;
noOfMaterial: any;

  constructor(private router: Router, private adminService:AdminService) {
    this.adminDetails = this.adminService.adminServiceData
    // if (this.adminDetails.adminEmail.length <= 0) {
    //   alert("Kindly login as a admin")
    //   this.router.navigate(['admin'])
    // }

  }

}
