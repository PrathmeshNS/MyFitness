import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/entity/trainer';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-show-trainer',
  templateUrl: './show-trainer.component.html',
  styleUrls: ['./show-trainer.component.css'],
})
export class ShowTrainerComponent {

  showApproveTrainer = true;

  trainerDetails: Trainer[] = [];

  constructor(private trainerService: TrainerService, private router: Router) { }

  showApproved() {
    this.showApproveTrainer = true;
  }
  showUnApproved() {
    this.showApproveTrainer = false;
  }

  ngOnInit() {
    this.trainerService.getAllTrainer().subscribe({
      next: (value) => {
        this.trainerDetails = value;
        console.log(value)
        console.log(this.trainerDetails)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }



  approveTrainer(id: number, fullName:String) {
    this.trainerService.approveTrainer(id).subscribe({
      next: (value) => {
        console.log(value)
        alert(fullName+" Approve Sucessfully!!")
        this.reloadPage()
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  
  showDetails(id: number) {
    throw new Error('Method not implemented.');
  }

  reloadPage() {
    window.location.reload()
  }

  goBack() {
    this.router.navigate(['admin/adminView']);
  }
}
