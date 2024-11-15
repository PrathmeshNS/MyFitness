import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingStatusOfMaterial } from '../entity/bookingStatusOfMaterial';
import { Member } from '../entity/member';
import { Material } from '../entity/material';
import { NONE_TYPE } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingStatusService {


  private member: Member = {
    memberId: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    mobileNo: '',
    forgetPasswordAnswer: '',
    confirmPassword: ''
  }

  private material: Material = {
    materialId: 0,
    materialName: '',
    quantity: 0,
    materialDescription: '',
    url: ''
  }

  bookingStatus: BookingStatusOfMaterial = {
    bookingMaterialId: 0,
    status: false,
    member: this.member,
    material: this.material
  }

  private api = "http://localhost:8080/bookingStatus/"

  constructor(private http: HttpClient) {

  }

  bookMaterial(memberId: number, materialId: number) {
    this.member.memberId = memberId;
    this.material.materialId = materialId
    return this.http.post(this.api + "bookMaterial", this.bookingStatus);
  }

  checkMemberMaterial(memberId: number){
    return this.http.get(`${this.api + 'checkMemberMaterial'}/${memberId}`);
  }

  
}
