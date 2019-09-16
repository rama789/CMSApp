import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class Global {

  constructor() {
    this.setUserData();
  }

  users: IUser[];
  roleId: string;
  isLoggedIn: boolean = false;
  notifyLogin: Subject<any> = new Subject<any>();
  boqData: any;
  name: string;

  Authenticate(userName: string, password: string): void {
    this.users.forEach(user => {
      if (user.UserName == userName && user.Password == password) {
        this.roleId = user.RoleId;
        this.name = user.Name;
        this.isLoggedIn = true;
        this.notifyLogin.next(this.isLoggedIn);
      }
    });
  }

  setUserData() {
    this.users = [{
      UserName: "cmsmanager",
      Name:"CMS Manager",
      Password: "cmsmanager",
      RoleId: "R1",
      RoleName: "Role1"
    },
    {
      UserName: "cmsdirector",
      Name: "CMS Director",
      Password: "cmsdirector",
      RoleId: "R2",
      RoleName: "Role2"
    },
    {
      UserName: "cmsexecutive",
      Name: "CMS Executive",
      Password: "cmsexecutive",
      RoleId: "R3",
      RoleName: "Role3"
    }]
  }
}

export interface IUser {
  UserName: string;
  Name: string,
  Password: string;
  RoleId: string;
  RoleName: string;
}

