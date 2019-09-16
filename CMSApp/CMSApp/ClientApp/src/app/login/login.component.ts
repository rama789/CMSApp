import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { LoginService } from "./login.service"
import { Global } from "../global"
import { NavigateDataService } from '../navigate-data.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],  
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  constructor(private loginService: LoginService,
    private global: Global,
    private router: Router,
    private navigateDataService: NavigateDataService,
    private toastrService: ToastrService) { }


  onSubmit(loginForm: NgForm): void {    
    this.userName = loginForm.value.login;
    this.password = loginForm.value.password;
    this.global.Authenticate(this.userName, this.password);

    if (this.global.isLoggedIn) {
      this.loginService.getBOQData(this.global.roleId).subscribe(
        response => {
          this.navigateDataService.setData(response);
          this.router.navigate(["/approval-content"]);
        });
    } else {
      this.toastrService.error("Please enter valid credentails");
    }
  }

  ngOnInit() {
  }

}
