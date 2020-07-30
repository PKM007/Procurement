import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-requisition-home',
  templateUrl: './requisition-home.component.html',
  styleUrls: ['./requisition-home.component.scss']
})
export class RequisitionHomeComponent implements OnInit {
  type: any;

  order: any = {};

  constructor(private orderService: OrderService) { }

  ngOnInit() {

    this.type = localStorage.getItem('type');

    this.orderService.getAllOrderCount().subscribe((data: any) => {
      this.order.all = data;
    });

    this.orderService.getStatusOrderCount('Pending').subscribe((data: any) => {
      this.order.pending = data;
    });

    this.orderService.getStatusOrderCount('Approved').subscribe((data: any) => {
      this.order.approved = data;
    });
  }

}
