import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { NavigateDataService } from '../navigate-data.service';
import { Global } from '../global';

@Component({
  selector: 'app-boq-approval',
  templateUrl: './boq-approval.component.html',
  styleUrls: ['./boq-approval.component.css']
})
export class BoqApprovalComponent implements OnInit {
  boqApprovalData: any;
  boqId: string;
  boqItem: any;
  comments: string = "";
  totalAmount: any = 0;
  name: string = "";

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private global: Global,
              private navigateDataService: NavigateDataService) { }

  setBOQStatus(status: any) {
    for (var i = 0; i < this.boqApprovalData.length; i++) {
      if (this.boqId == this.boqApprovalData[i].name) {
        this.boqApprovalData[i].status = status;
        this.boqApprovalData[i].comments = this.comments;
        this.comments = "";
        break;
      }
    }
    this.navigateDataService.setData(this.boqApprovalData);
    this.router.navigate(["approval-content"]);
  }

  getTotalAmount() {
    this.totalAmount = 0;
    this.boqItem.items.forEach(item => {
      this.totalAmount += item.unitPrice * item.units;
    });
  }

  ngOnInit() {    
    this.boqId = this.activeRoute.snapshot.params["id"];
    this.name = this.global.name;
    this.boqApprovalData = this.navigateDataService.getData();
    this.boqApprovalData.forEach(item => {
      if (this.boqId == item.name) {
        this.boqItem = item;
      }
    });
    this.getTotalAmount();
  }

}
