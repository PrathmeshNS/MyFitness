import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/entity/trainer';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-login',
  templateUrl: './trainer-login.component.html',
  styleUrls: ['./trainer-login.component.css']
})
export class TrainerLoginComponent {
  showLogin = true;
  showForgetSection = true;
  email: any;
  password: any;
  msg = true;
  loginError = true;
  confirmPassword= true;
  
  trainer: Trainer = {
    trainer_id: 0,
    fullName: '',
    email: '',
    password: '',
    confirmPassword:'',
    mobileNo: '',
    forgetPasswordAnswer: '',
    approve: undefined,
    aqaureByMember: 0,
    gender: ''
  };

  constructor(private trainerService: TrainerService, private router: Router) {}

  ngOnInit() {
    if (localStorage.length > 0) {
      this.setLocalStorage();
      this.onSubmit();
    }
  }

  onSubmit() {
    this.trainerService.loginTrainer(this.trainer).subscribe({
      next: (value) => {
        localStorage.setItem('email', this.trainer.email);
        localStorage.setItem('password', this.trainer.password);
        this.router.navigate(['member']);
      },
      error: (err) => {
        this.loginError = false
      },
    })
  }


  onCheck() {
    this.trainerService.checkForgetPassword(this.trainer).subscribe({
      next: (value) => {
        this.showForgetSection = false;
        this.trainer.password = "";
      },
      error: (err) => {
        this.msg = false;
      },
    });
  }

  onChangePassword() {
    if (this.trainer.password.match(this.trainer.confirmPassword)) {
      this.trainerService.updatePassword(this.trainer).subscribe({
        next: (value) => {
          this.showLogin = true
          this.trainer.email = ""
          this.trainer.password = ""
        },
        error: (err) => {
        },
      });
    }
    else{
      this.confirmPassword = false
    }
  }

  setLocalStorage() {
    this.email = localStorage.getItem('email');
    this.password = localStorage.getItem('password');
    this.trainer.email = this.email.toString();
    this.trainer.password = this.password.toString();
  }
}
