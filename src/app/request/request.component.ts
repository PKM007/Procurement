import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from '../data.service';
import { OrderService } from '../order.service';
import { LocationService } from '../location.service';
import { ItemService } from '../item.service';
import { StatusService } from '../status.service';
import { Observable } from 'rxjs';
import { IOrder } from '../order';
import { Sort } from '@angular/material';


import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

import { MatTableDataSource } from '@angular/material';




@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  public sorderList: any = [ ];

  public locationList: any = [ ];

  public itemList: any = [ ];

  public delOrder: any = [ ];

  public delLocation: any = [ ];

  public delItem: any = [ ];

  closeResult: string;

  isShow = true;

  public order: any = {};

  public orderList: any = [];

  sub: any;

  locations: any;

  items: any;

  interval: any;

  public multiLocs: any = [ ];

  public finalItem: any = [ ];

  dataSource: any;


  displayedColumns: string[] = ['order_id', 'created_by', 'date', 'order_desc', 'status', 'edit', 'delete', 'replicate', 'mark_complete'];

  message: string;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass = false;


  constructor(private router: Router,
     public http: HttpClient,
     public snackBar: MatSnackBar,
      private data: DataService,
      private orderService: OrderService,
      private locationService: LocationService,
      private itemService: ItemService,
      private statusService: StatusService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((data: any) =>{
      this.dataSource = new MatTableDataSource(data);
      this.orderList = data;
    });

    this.itemService.getAllItems().subscribe((data: any) =>{
      this.itemList = data;
    });

    this.locationService.getAllLocations().subscribe((data: any)=>{
      this.locationList = data;
    });

    // console.log("order-", this.orderList);
    // console.log("item-", this.itemList);
    // console.log("location-", this.locationList);


    this.data.currentMessage.subscribe(message => this.sub = message);
  //   this.interval = setInterval(() => {
  //     this.getData();
  // }, 2000);
  }

  onEdit(order_id)
  {
    console.log('Edit-' + order_id);
    this.sub = order_id;
    this.data.changeMessage(this.sub);
    this.router.navigate(['/edit']);
  }


  onReplicate(order_id,refresher)
  {
    // console.log('Replicate-' + order_id);
    // this.order.order_id = Math.floor(Math.random() * 5000) + 1;
    // this.getOrder(order_id);
    // // this.getLocation(order_id);
    // this.getItem(order_id);
    // this.message = 'Replicated Sucessfully';
    // this.insert();
    // this.doRefresh(refresher);
    this.order = this.orderList.filter(order => order.order_id === order_id);
    this.order = this.order[0];
    this.items = this.itemList.filter(item => item.order_id === order_id);
    this.locations = this.locationList.filter(location => location.order_id === order_id);
    for(let item of this.items)
    {
      let i: any = {};
      i.name = item.name;
      i.specification = item.specification;
      i.prefered_vendor = item.prefered_vendor;
      i.quantity = item.quantity;
      i.unit_type = item.unit_type;
      i.price = item.price;
      i.currency = item.currency;
      i.custom = item.custom;
      i.comment = item.comment;
      this.finalItem.push(i);
    }

    for(let location of this.locations)
    {
      let l: any = {};
      l.location = location.location;
      l.department = location.department;
      this.multiLocs.push(l);
    }

    console.log("order-", this.order);
    console.log("item-", this.finalItem);
    console.log("location-", this.multiLocs);

    this.order.finalItem = this.finalItem;
    this.order.multiLocs = this.multiLocs;
    console.log(this.order);

    this.orderService.replicateOrder(this.order);
    this.message = 'Replicated Sucessfully';
    this.insert();
    this.doRefresh(refresher);
    this.doRefresh(refresher);
  }

  onDelete(id,refresher){

    this.order.action = 'delete';
    this.order.order_id = id;
    this.http.post('http://localhost/My Project/ionic2php/deleteorder.php', this.order).subscribe((data: any[]) => {
    console.log(data);
    this.message = 'Deleted Sucessfully';
    this.insert();
    this.doRefresh(refresher);
    }, err => {
    this.message = 'Deletion failed';
    this.insert();
    console.log(err);
    });

  }

  // onDelete(id: any, refresher)
  // {
  //   this.orderService.deleteOrder(id);
  //   this.locationService.deleteLocation(id);
  //   this.itemService.deleteItem(id);
  //   this.message = 'Deleted Sucessfully';
  //   this.insert();
  //   this.doRefresh(refresher);
  // }


  getData() {
    this.orderService.getAllOrders().subscribe((data: any[]) => {
      this.orderList = data;
      this.dataSource = new MatTableDataSource(this.orderList);
    });
  }

  // getData() {
  //   this.http.get('http://pkm007requisition.000webhostapp.com/json.php').subscribe((data: any[]) => {
  //     this.orderList = data;
  //     this.dataSource = new MatTableDataSource(this.orderList);
  //   });
  //   }

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);

      setTimeout(() => {
        console.log('Async operation has ended');
        this.ngOnInit();
        refresher.target.complete();
      }, 2000);
    }

    insert() {
      const config = new MatSnackBarConfig();
      config.verticalPosition = this.verticalPosition;
      config.horizontalPosition = this.horizontalPosition;
      config.duration = this.setAutoHide ? this.autoHide : 0;
      this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
    }





    refreshData()
    {
      window.location.reload();
    }

    // getOrder(order_id: any) {
    //   let params = new HttpParams().set('order_id', order_id);
    //   this.http.get('http://pkm007requisition.000webhostapp.com/getOrder.php', { params: params }).subscribe( data => {
    //     this.sorderList = data;
    //     console.log("Order List-", this.sorderList);
    //     for (const order of this.sorderList) {
    //       this.order.created_by = order.created_by;
    //       this.order.date = order.date;
    //       this.order.desc = order.order_desc;
    //     }
    //   }, err => {
    //     JSON.parse(JSON.stringify(err));
    //   });
    //   }

    //   getLocation(order_id: any) {
    //     let params = new HttpParams().set('order_id', order_id);
    //     this.http.get('http://pkm007requisition.000webhostapp.com/getLocation.php', { params: params }).subscribe((data) => {
    //       this.locationList = data;
    //       console.log(data);
    //       for (const location of this.locationList) {
    //         this.multiLocs.push(location);
    //       }
    //     });
    //     }

    //     getItem(order_id: any) {
    //       let params = new HttpParams().set('order_id', order_id);
    //       this.http.get('http://pkm007requisition.000webhostapp.com/getItem.php', { params: params }).subscribe((data) => {
    //         this.itemList = data;
    //         console.log(data);
    //         for (const item of this.itemList) {
    //           this.finalItem.push(item);
    //         }
    //         this.replicate();
    //       });
    //       }


    getOrder(order_id: any) {
      this.orderService.getOrderById(order_id).subscribe( data => {
        this.sorderList = data;
        console.log("Order List-", this.sorderList);
        this.order.created_by = this.sorderList.created_by;
        this.order.date = this.sorderList.date;
        this.order.order_desc = this.sorderList.order_desc;
        this.order.status = 'pending';
        this.order.message = 'Request submitted for review';
      });
      }

      // getLocation(order_id: any) {
      //   this.locationService.getLocationById(order_id).subscribe((data) => {
      //     this.locationList = data;
      //     console.log(data);
      //     for (const location of this.locationList) {
      //       this.location.push({
      //         order_id: this.order.order_id,
      //         location: location.location,
      //         department: location.department,
      //         });
      //     }
      //     console.log("replicated location-",this.location);
      //   });
      //   }



            sortOrder(sort: Sort) {
              const data = this.orderList.slice();
              if (!sort.active || sort.direction === '') {
                 this.dataSource = data;
                 return;
              }

              this.dataSource = data.sort((a, b) => {
                const isAsc = sort.direction === 'asc';
                switch (sort.active) {
                   case 'order_id': return this.compare(a.order_id, b.order_id, isAsc);
                   case 'created_by': return this.compare(a.created_by, b.created_by, isAsc);
                   case 'date': return this.compare(a.date, b.date, isAsc);
                   default: return 0;
                }
             });

            }

            compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
              return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
           }


           onTrack(order_id: any)
           {
             this.sub = order_id;
             this.data.changeMessage(this.sub);
             this.router.navigate(['/track-order']);
           }





}
