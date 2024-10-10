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

  constructor(private trainerService: TrainerService, private router: Router) {}

  showApproved() {
    this.showApproveTrainer = true;
  }
  showUnApproved() {
    this.showApproveTrainer = false;
  }

  ngOnInit() {
    this.trainerService.getAllTrainer().subscribe({
      next: (value) => {
        console.log( "from ",value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goBack() {
    this.router.navigate(['admin/adminView']);
  }
}
