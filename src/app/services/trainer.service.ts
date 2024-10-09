import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {


  private api = "http://localhost:8081/trainer"
  constructor() { }
}
