import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/entity/trainer';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-register',
  templateUrl: './trainer-register.component.html',
  styleUrls: ['./trainer-register.component.css']
})
export class TrainerRegisterComponent {
  showSecound = false;
  registerError = false;

  trainer: Trainer = {
    trainer_id: 0,
    fullName: '',
    email: '',
    password: '',
    mobileNo: '',
    forgetPasswordAnswer: '',
    approve: false,
    aqaureByMember: 0,
    gender: '',
    confirmPassword: ''
  };

  constructor(private trainerService: TrainerService, private router: Router) { }

  onSubmit() {
    this.trainerService.insertTrainer(this.trainer).subscribe({
      next: (value) => {
        console.log(value)
        this.router.navigate(['/trainer/'])
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  onNext() {
    this.trainerService.checkEmail(this.trainer.email).subscribe({
      next: (value) => {
        if (value ==null) {
          console.log("from next : ",value)
          this.showSecound= true;
        }
        this.registerError = true
      },
      error: (err) => {
        console.log("from error : ",err)
      },
    })
  }
}
