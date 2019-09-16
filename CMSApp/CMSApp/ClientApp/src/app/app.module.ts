import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common'

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { ApprovalContentComponent } from './approval-content/approval-content.component';
import { BoqApprovalComponent } from './boq-approval/boq-approval.component';

import { LoginService } from './login/login.service';
import { AuthGuard } from './auth-guard/auth.guard'
import { Global } from './global';
import { NavigateDataService } from './navigate-data.service'

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    ApprovalContentComponent,
    BoqApprovalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'approval-content', component: ApprovalContentComponent, canActivate: [AuthGuard] },
      { path: 'approval-content/:id', component: BoqApprovalComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [LoginService, Global, AuthGuard, NavigateDataService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
