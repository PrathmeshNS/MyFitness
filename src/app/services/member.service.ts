import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../entity/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  serviceMemberData: Member = {
    memberId: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNo: '',
    forgetPasswordAnswer: '',
    gender: '',
    confirmPassword: ''
  };

  private api = 'http://localhost:8081/member/';

  constructor(private http: HttpClient) {}

  checkMemberEmail(member: Member): Observable<any> {
    return this.http.get(
      `${this.api + 'checkEmail'}/${member.email}`);
  }

  insertMember(member: Member): Observable<any> {
    return this.http.post<Member>(this.api + 'insertMember', member);
  }

  getAllMember(): Observable<any> {
    return this.http.get<any>(this.api + 'getAllMemberData');
  }

  loginMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.api + 'loginMember', member);
  }

  searchMemberById(memberId: number): Observable<Member> {
    return this.http.get<Member>(
      `${this.api + 'searchMemberById'}/${memberId}`
    );
  }

  deleteMemberById(memberId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.api + 'deleteMemberById'}/${memberId}`
    );
  }

  checkForgetPassword(member: Member): Observable<any> {
    return this.http.post(this.api + 'forgetPassword', member);
  }

  updatePassword(member: Member): Observable<any> {
    return this.http.post(this.api + 'updatePassword', member);
  }
}
