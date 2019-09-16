import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../environments/environment";

const apiUrl = environment.apiUrl;

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }  

  getBOQData(role: string) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.httpClient.get(apiUrl + "/api/boq/" + role, httpOptions);
  }
}
