import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Global } from "../global";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isLogged = false;
  subscription: any;
  name: string;

  constructor(private global: Global,
              private router: Router) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  signOut() {
    this.global.isLoggedIn = false;
    this.isLogged = false;
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.subscription = this.global.notifyLogin.subscribe(value => {
      this.name = this.global.name;
      this.isLogged = this.global.isLoggedIn;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
