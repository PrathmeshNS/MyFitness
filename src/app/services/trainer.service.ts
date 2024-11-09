import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trainer } from '../entity/trainer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {

  trainerServiceDetails: Trainer = {
    trainer_id: 0,
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    forgetPasswordAnswer: '',
    approve: false,
    aqaureByMember: 0,
    gender: ''
  }



  private api = 'http://localhost:8080/trainer/';

  constructor(private http: HttpClient) { }

  getAllTrainer(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.api + 'listOfTrainer');
  }

  loginTrainer(trainer: Trainer):Observable<any> {
    return this.http.post(this.api + 'loginTrainer', trainer);
  }

  searchTrainerById(trainerId: number) {
    return this.http.get<Trainer>(`${this.api + 'approveTrainer'}/${trainerId}`);
  }

  insertTrainer(trainer: Trainer) {
    return this.http.post(this.api + "insertTrainer", trainer)
  }

  approveTrainer(trainerId: number) {
    return this.http.get<Trainer>(`${this.api + 'approveTrainer'}/${trainerId}`);
  }

  numberOfTrainer() {
    return this.http.get(this.api + 'numberOfTrainer')
  }

  checkEmail(trainerEmail: string) {
    return this.http.get<Trainer>(`${this.api + 'searchByEmail'}/${trainerEmail}`);
  }

  checkForgetPassword(trainer: Trainer) {
    return this.http.post(this.api + "checkForgetPassword", trainer);
  }

  updatePassword(trainer: Trainer) {
    return this.http.post(this.api + "updatePassword", trainer);
  }

}
