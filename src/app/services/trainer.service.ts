import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trainer } from '../entity/trainer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private api = 'http://localhost:8081/trainer/';
  constructor(private http: HttpClient) {}

  getAllTrainer():Observable<Trainer>{
    return this.http.get<Trainer>(this.api + 'listOfTrainer');
  }

  loginTrainer(trainer: Trainer) {
    return this.http.post(this.api + 'loginTrainer', trainer);
  }

  searchTrainerById(trainerId: number) {
    return this.http.get<Trainer>(`${this.api + 'approveTrainer'}/${trainerId}`);
  }

  insertTrainer(trainer:Trainer){
    this.http.post(this.api+"insertTrainer",trainer)
  }

}
