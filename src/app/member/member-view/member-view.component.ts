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
  bookedMaterial = true;
  showMaterialContent = true;

  count = 0;
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

  bookedMaterialShow: BookingStatusOfMaterial[] = [];

  material: Material[] = [];

  constructor(private memberService: MemberService,
    private router: Router,
    private materialService: MaterialService,
    private bookingStatusMaterial: BookingStatusService) {
    if (localStorage.getItem("memberEmail") == null) {
      alert("Please Login as Member")
      router.navigate(['member'])
    } else {
      this.memberDetails = memberService.serviceMemberData
      this.checkMemberMaterial(this.memberDetails.memberId)
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

  private myPassword: string[] = [
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
    this.removeLocalStorage()
    this.router.navigate(['./']);
  }


  viewMaterial(materialId: number) {

  }


  bookMaterial(materialId: number) {
    this.bookingStatusMaterial.bookMaterial(this.memberDetails.memberId, materialId).subscribe({
      next: (value) => {
          if (value) {
            this.reloadPage()
          }
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  private checkMemberMaterial(memberId: number) {
    this.bookingStatusMaterial.checkMemberMaterial(memberId).subscribe({
      next: (value) => {
        if (value != null) {
          console.log(value)
          // this.bookedMaterialShow = value;
          console.log(this.bookedMaterialShow)

          if (this.bookedMaterialShow.length>=0) {
            
            console.log(this.bookedMaterialShow)
            this.bookedMaterial = true
          }
        }
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  private removeLocalStorage() {
    localStorage.clear()
  }
  private reloadPage(){
    window.location.reload()
  }
}
