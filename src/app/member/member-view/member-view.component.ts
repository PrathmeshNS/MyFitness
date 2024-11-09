import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from 'src/app/entity/material';
import { Member } from 'src/app/entity/member';
import { MaterialService } from 'src/app/services/material.service';
import { MemberService } from 'src/app/services/member.service';
import { LoginPageComponent } from '../member-login/login-page.component';
import { BookingStatusOfMaterial } from 'src/app/entity/bookingStatusOfMaterial';
import { BookingStatusService } from 'src/app/services/booking-status.service';

@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css'],
})
export class MemberViewComponent {

  showMaterialContent = true;
  memberDetails: Member = {
    memberId: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    mobileNo: '',
    forgetPasswordAnswer: '',
    confirmPassword: '',
  };

  material: Material[] = [];

  constructor(private memberService: MemberService,
    private router: Router,
    private materialService: MaterialService,
    private bookingStatusMaterial: BookingStatusService) {
    this.memberDetails = this.memberService.serviceMemberData;
    if (this.memberDetails.firstName.length <= 0) {
      if (localStorage.length <= 0) {
        alert('Login First as a Member');
        this.router.navigate(['/member/']);
      }
    }
  }

  ngOnInit() {
    this.materialService.getAllMaterial().subscribe({
      next: (value) => {
        this.material = value;
      },
      error: (error) => {
      },
    });
  }

  showUserProfile() {
    this.showMaterialContent = false;
  }

  goBackToMaterial() {
    this.showMaterialContent = true;
  }

  myPassword: string[] = [
    '**************7e8j5j6',
    '**************7e88jg',
    '**************7e8uhgs',
    '**************7e932s',
    '**************g58d2s',
    '**************we3k2s',
    '**************fh983s',
  ];
  
  generateRandomePassword() {
    const randomIndex = Math.floor(Math.random() * this.myPassword.length);
    return this.myPassword[randomIndex];
  }

  logout() {
    this.memberDetails.email = ""
    this.memberDetails.password = ""
    this.router.navigate(['./']);
  }


  viewMaterial(materialId: number) {
    
  }


  bookMaterial(materialId: number) {
    this.bookingStatusMaterial.bookMaterial(this.memberDetails.memberId, materialId).subscribe({
      next: (value) => {
        console.log(value)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
