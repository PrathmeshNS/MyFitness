import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/entity/trainer';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
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
  confirmPassword = true;

  trainer: Trainer = {
    trainer_id: 0,
    fullName: '',
    email: "",
    password: "",
    confirmPassword: '',
    mobileNo: '',
    forgetPasswordAnswer: '',
    approve: undefined,
    aqaureByMember: 0,
    gender: ''
  };

  constructor(private trainerService: TrainerService, private router: Router, private encryptDecrypt: EncryptDecryptService) { }

  ngOnInit() {
    if (localStorage.length > 0) {
      this.onSubmit();
    }
  }

  onSubmit() {
    this.trainerService.loginTrainer(this.trainer).subscribe({
      next: (value) => {
        console.log(value)
        if (value!=null) {
          this.setLocalStorage()
          this.router.navigate(['/trainer/view']);
        }
        this.loginError = false
      },
      error: (err) => {
        console.log("error :", err)
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
    else {
      this.confirmPassword = false
    }
  }

  setLocalStorage() {
    localStorage.setItem('tEmail', this.encryptDecrypt.encryption(this.trainer.email));
    localStorage.setItem('tPassword', this.encryptDecrypt.encryption(this.trainer.password));
  }

  private autoLogin() {
    if (localStorage.length >= 0) {
      const email = localStorage.getItem('tEmail');
      const password = localStorage.getItem('tPassword');
      this.trainer.email = (this.encryptDecrypt.decryption(email))
      this.trainer.password = (this.encryptDecrypt.decryption(password))
    }
    else{
      console.log("User Not Found")
    }
  }
}
