import { Component, OnInit } from '@angular/core';
import { NavigateDataService } from '../navigate-data.service'

@Component({
  selector: 'app-approval-content',
  templateUrl: './approval-content.component.html',
  styleUrls: ['./approval-content.component.css']
})
export class ApprovalContentComponent implements OnInit {

  constructor(private navigateDataService: NavigateDataService) { }

  boqContents: any;
  totalAmount = 0;

  calculateTotalAmount(boqId: string) {
    this.totalAmount = 0;
    this.boqContents.forEach(boqContent => {
      if (boqId == boqContent.name) {
        boqContent.items.forEach(item => {
          this.totalAmount += item.unitPrice * item.units;
        });
      }
    })
    return this.totalAmount;
  }

  ngOnInit() {
    this.boqContents = this.navigateDataService.getData();    
  }

}
