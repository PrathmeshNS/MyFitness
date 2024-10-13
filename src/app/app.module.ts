import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { RouterLink } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MemberViewComponent } from './member/member-view/member-view.component';
import { TrainerViewComponent } from './trainer/trainer-view/trainer-view.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { SalutationPipe } from './pipes/salutation.pipe';
import { UserImagePipe } from './pipes/user-image.pipe';
import { ShowMemberComponent } from './admin/ui/member/show-member/show-member.component';
import { ShowBookingComponent } from './admin/ui/viewBooking/show-booking/show-booking.component';
import { MaterialViewComponent } from './admin/ui/material/material-view/material-view.component';
import { LoginComponent } from './admin/login/login.component';

import { ShowTrainerComponent } from './admin/ui/trainer/show-trainer/show-trainer.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ShowAttendanceComponent } from './admin/ui/attendance/show-attendance/show-attendance.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    MemberViewComponent,
    TrainerViewComponent,
    TrainerViewComponent,
    AdminViewComponent,
    LoginComponent,
    SalutationPipe,
    UserImagePipe,
    ShowMemberComponent,
    ShowBookingComponent,
    MaterialViewComponent,
    ShowTrainerComponent,
    LoginPageComponent,
    ShowAttendanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
