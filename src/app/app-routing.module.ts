import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './member/member-register/register.component';
import { HomeComponent } from './home/home.component';
import { MemberViewComponent } from './member/member-view/member-view.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { ShowMemberComponent } from './admin/ui/member/show-member/show-member.component';
import { MaterialViewComponent } from './admin/ui/material/material-view/material-view.component';
import { ShowBookingComponent } from './admin/ui/viewBooking/show-booking/show-booking.component';
import { ShowTrainerComponent } from './admin/ui/trainer/show-trainer/show-trainer.component';
import { LoginPageComponent } from './member/member-login/login-page.component';
import { LoginComponent } from './admin/login/login.component';
import { ShowAttendanceComponent } from './admin/ui/attendance/show-attendance/show-attendance.component';
import { TrainerLoginComponent } from './trainer/trainer-login/trainer-login.component';
import { TrainerRegisterComponent } from './trainer/trainer-register/trainer-register.component';
import { TrainerViewComponent } from './trainer/trainer-view/trainer-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'member', children: [
      {
        path: '', component: LoginPageComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'view', component: MemberViewComponent
      }
    ]
  },

  {
    path: 'trainer', children: [
      {
        path: '', component: TrainerLoginComponent
      },
      {
        path: 'register', component: TrainerRegisterComponent
      },
      {
        path: 'view', component: TrainerViewComponent
      }
    ]
  },
  {
    path: 'admin', children: [
      {
        path: '', component: LoginComponent
      },
      {
        path: 'adminView', children: [
          {
            path: '', component: AdminViewComponent
          },
          {
            path: 'showMember', component: ShowMemberComponent
          },
          {
            path: 'showTrainer', component: ShowTrainerComponent
          },
          {
            path: 'showMaterial', component: MaterialViewComponent
          },
          {
            path: 'showBooking', component: ShowBookingComponent
          },
          {
            path: 'showAttendance', component: ShowAttendanceComponent
          }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
