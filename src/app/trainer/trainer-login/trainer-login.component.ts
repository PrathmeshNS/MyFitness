import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { endWith } from 'rxjs';
import { Trainer } from 'src/app/entity/trainer';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { MaterialService } from 'src/app/services/material.service';
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
    approve: false,
    aqaureByMember: 0,
    gender: ''
  };

  constructor(private trainerService: TrainerService, private router: Router, private encryptDecrypt: EncryptDecryptService) {
    if (localStorage.getItem("tEmail") != null) {
      this.autoLogin()
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.trainerService.loginTrainer(this.trainer).subscribe({
      next: (value) => {
        console.log(value)
        if (value != null) {
          this.trainerService.trainerServiceDetails = value;
          console.warn("Here At If ")
          if (this.trainerService.trainerServiceDetails.approve) {
            this.setLocalStorage()
            console.warn("Here approve ")

            this.router.navigate(['/trainer/view']);
          }
          else {
            alert("Your Are Not Approve yet. Wait Till Approve!!")
          }
        }
        else {
          this.loginError = false
        }
      },
      error: (err) => {
        console.log("error :", err)
      },
    })
  }


  onCheck() {
    this.trainerService.checkForgetPassword(this.trainer).subscribe({
      next: (value) => {
        console.log(value)
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

  private setLocalStorage() {
    localStorage.setItem('tEmail', this.encryptDecrypt.encryption(this.trainer.email));
    localStorage.setItem('tPassword', this.encryptDecrypt.encryption(this.trainer.password));
  }

  private autoLogin() {
    if (localStorage.getItem("tEmail") != null) {
      const email = localStorage.getItem('tEmail');
      const password = localStorage.getItem('tPassword');
      this.trainer.email = (this.encryptDecrypt.decryption(email)).toString();
      this.trainer.password = (this.encryptDecrypt.decryption(password)).toString();

      this.onSubmit()
    }
    else {
      console.log("User Not Found")
    }
  }

}
