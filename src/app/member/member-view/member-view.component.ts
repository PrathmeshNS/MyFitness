import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from 'src/app/entity/material';
import { Member } from 'src/app/entity/member';
import { MaterialService } from 'src/app/services/material.service';
import { MemberService } from 'src/app/services/member.service';

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

  constructor( private memberService: MemberService, private router: Router,private materialService: MaterialService  ) {
      this.ngOnDestroy()

    this.memberDetails = this.memberService.serviceMemberData;
    if (this.memberDetails.firstName.length <= 0) {
      if (localStorage.length <= 0) {
        alert('Login First as a Member');
        this.router.navigate(['login']);
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
    this.ngOnDestroy()
    this.router.navigate(['./']);
  }

  ngOnDestroy(){
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.clear()
  }
}
