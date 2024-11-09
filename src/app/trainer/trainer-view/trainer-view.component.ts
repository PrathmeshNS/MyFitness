import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from 'src/app/entity/material';
import { Trainer } from 'src/app/entity/trainer';
import { MaterialService } from 'src/app/services/material.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './trainer-view.component.html',
  styleUrls: ['./trainer-view.component.css']
})
export class TrainerViewComponent {

  showTrainerProfile = false;
  
  material: Material[] = [];


  trainerDetails: Trainer = {
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


  constructor(private trainerService: TrainerService, private router:Router, private materialService: MaterialService) {
    if (localStorage.getItem("tEmail")==null) {
      alert("Please Login as Trainer")
      router.navigate(['trainer'])
    }else{
      this.trainerDetails = trainerService.trainerServiceDetails
      this.getAllMaterrial()
    }
  }


  private myPassword: string[] = [
    '**************7e8j5j6',
    '**************7e88jg',
    '**************7e8uhgs',
    '**************7e932s',
    '**************g58d2s',
    '**************we3k2s',
    '**************fh983s',
  ];

  generateRandomePassword() {
    const randomIndex = Math.floor(Math.random() * this.myPassword.length);
    return this.myPassword[randomIndex];
  }

  getAllMaterrial(){
    this.materialService.getAllMaterial().subscribe({
      next:(value)=> {
         console.log(value)
         this.material = value
      },
      error:(err) =>{
          console.log(err)
      },
    })

  }
}
