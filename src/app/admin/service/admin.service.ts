import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/entity/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  adminServiceData:Admin={
    adminId: 0,
    adminName: '',
    adminEmail: "",
    adminPassword: ''
  }


  private api = 'http://localhost:8081/admin/';

  constructor(private http:HttpClient) {
    
  }

  // registerAdmin(admin:Admin):Observable<any>{
  //   return this.http.post(this.api +"insertAdmin",admin)
  // }

  adminLogin(admin:Admin):Observable<any>{
    return this.http.post(this.api+"adminLogin",admin)
  }
}
