import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/entity/admin';
import { AdminService } from '../service/admin.service';
import { MemberService } from 'src/app/services/member.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { MaterialService } from 'src/app/services/material.service';

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

  constructor(private router: Router, private memberService: MemberService, private adminService: AdminService, private trainerService: TrainerService, private materialService: MaterialService) {
    this.adminDetails = adminService.adminServiceData;
    if (localStorage.length<=0) {
      alert("Kindly login as a admin")
      this.router.navigate(['admin'])
    }
  }

  ngOnInit() {
    this.numberOfMaterial()
    this.numberOfMember()
    this.numberOfTrainer()
  }


  private numberOfMember() {
    this.memberService.numberOfMember().subscribe({
      next: (value) => {
        this.noOfMember = value
      },
      error: (err) => {

      },
    });
  }

  private numberOfMaterial() {
    this.materialService.numberOfMaterial().subscribe({
      next: (value) => {
        this.noOfMaterial = value
      },
      error: (err) => {
      },
    })

  }

  private numberOfTrainer() {
    this.trainerService.numberOfTrainer().subscribe({
      next: (value) => {
        this.noOfTrainer = value
      },
      error: (err) => {
      },
    })
  }

  clearingLocalStrorage() {
    localStorage.clear();
  }

}
