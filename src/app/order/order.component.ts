import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from '../data.service';
import { OrderService } from '../order.service';
import { LocationService } from '../location.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  sub: any;

  public orderList: any = [ ];

  public locationList: any = [ ];

  public itemList: any = [ ];

  closeResult: string;

  isShow = true;

  new = true;

  catalogDisplay = true;

  decision: any;



  change = true;

  toggleSelected = true;

  option: string;

  interval: any;


  order: any = {};


  public multiLocs: any = [ ];

  public finalItem: any = [ ];

  public selectedCatalog: any = [ ];



  public items: any[] = [{
    name: '',
    specification: '',
    prefered_vendor: '',
    quantity: '',
    unit_type: '',
    price: '',
    currency: '',
    custom: '',
    comment: ''
  }];



  public catalogItems: any[] = [{
    name: '',
    specification: '',
    prefered_vendor: '',
    quantity: '',
    unit_type: '',
    price: '',
    currency: '',
    custom: '',
    comment: ''
  }];


  public catalog: any[] = [{
    name: 'Desktop',
    specification: '15 inch',
    prefered_vendor: 'Dell',
    quantity: '4',
    unit_type: 'DX-2323',
    price: '23000',
    currency: 'INR',
    custom: 'Windows',
    comment: 'Full Setup'
  },
  {
    name: 'Desktop',
    specification: '13 inch',
    prefered_vendor: 'HP',
    quantity: '6',
    unit_type: 'HP-733',
    price: '25000',
    currency: 'INR',
    custom: 'Windows',
    comment: 'Full Setup'
  },
  {
    name: 'Hard Drive',
    specification: '1 TB',
    prefered_vendor: 'Toshiba',
    quantity: '8',
    unit_type: 'T-3232',
    price: '3500',
    currency: 'INR',
    custom: 'USB-3.0',
    comment: ''
  },
  {
    name: 'Hard Drive',
    specification: '1 TB',
    prefered_vendor: 'Segate',
    quantity: '2',
    unit_type: 'S-323',
    price: '3000',
    currency: 'INR',
    custom: 'USB-3.0',
    comment: ''
  },
  {
    name: 'Wireless Router',
    specification: 'Mid Range',
    prefered_vendor: 'Cisco',
    quantity: '5',
    unit_type: 'C-4324',
    price: '1200',
    currency: 'INR',
    custom: 'None',
    comment: 'Reliable'
  },
  {
    name: 'Wireless Router',
    specification: 'Mid Range',
    prefered_vendor: 'Asus',
    quantity: '9',
    unit_type: 'A-4324',
    price: '1300',
    currency: 'INR',
    custom: 'None',
    comment: 'Reliable'
  },
  {
    name: 'Printer',
    specification: 'Ink Jet',
    prefered_vendor: 'HP',
    quantity: '6',
    unit_type: 'HP-2432',
    price: '3200',
    currency: 'INR',
    custom: 'With Extra Catridge',
    comment: 'Reliable'
  }

];

  public productNames: string[] = ['Desktop', 'Hard Drive', 'Wireless Router', 'Printer'];

  name: string;

  department: string;

  date: Date;

  order_desc: string;




  cities: string[] = [
    'Mumbai', 'Chennai', 'Delhi', 'Hyderabad', 'Bengalore', 'Pune'
  ];

  departments: string[] = [
    'IT', 'Electrical', 'HR', 'Management', 'Technical', 'Testing'
  ];




  constructor(private router: Router,
    private http: HttpClient,
    private data: DataService,
    private orderService: OrderService,
    private locationService: LocationService,
    private itemService: ItemService) { }


  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sub = message);
    this.orderService.getOrderById(this.sub).subscribe((data: any) =>{
      this.order = data[0];
    });

    this.orderService.getStatusById(this.sub).subscribe((data: any) =>{
      this.order.status = data[0].status;
      this.order.message = data[0].message;
    });

    this.itemService.getItemById(this.sub).subscribe((data) => {
      this.itemList = data;
      console.log("item data-",data);
      for (const item of this.itemList) {
        this.finalItem.push(item);
      }
    });

    this.locationService.getLocationById(this.sub).subscribe((data) => {
      this.locationList = data;
      console.log("location data-",data);
      for (const location of this.locationList) {
        this.multiLocs.push(location);
      }
    });

    console.log(this.sub);
    this.order.order_id = this.sub;

  }


  getOrder(order_id: any) {
    this.orderService.getOrderById(order_id).subscribe( data => {
      this.orderList = data;
      console.log("order data-",this.orderList);
      this.order.created_by = this.orderList.created_by;
      this.order.date = this.orderList.date;
      this.order.order_desc = this.orderList.order_desc;
      this.order.status = 'pending';
      this.order.message = 'Request submitted for review';
    });
  }

  getLocation(order_id: any) {
    this.locationService.getLocationById(order_id).subscribe((data) => {
      this.locationList = data;
      console.log("location data-",data);
      for (const location of this.locationList) {
        this.multiLocs.push(location);
      }
    });

  }

  getItem(order_id: any) {
    this.itemService.getItemById(order_id).subscribe((data) => {
      this.itemList = data;
      console.log("item data-",data);
      for (const item of this.itemList) {
        this.finalItem.push(item);
      }
    });

  }

  // getOrder(order_id: any) {
  //   let params = new HttpParams().set('order_id', order_id);
  //   this.http.get('http://pkm007requisition.000webhostapp.com/getOrder.php', { params: params }).subscribe( data => {
  //     this.orderList = data;
  //     console.log("Order List-", this.orderList);
  //     for (const order of this.orderList) {
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
  //       });
  //       }

        addItems() {
          this.items.push({
          name: '',
          specification: '',
          prefered_vendor: '',
          quantity: '',
          unit_type: '',
          price: '',
          currency: '',
          custom_type: '',
          comment: ''
          });
        }

        addLoc() {
          this.multiLocs.push({
          location: '',
          department: '',
          });
        }

        removeItems(i: number) {
          this.items.splice(i, 1);
        }

        logValue() {
          console.log(this.items);
        }

        locValue(loc, dept) {
          this.multiLocs.push({
            location: loc,
            department: dept,
            });
          console.log(this.multiLocs);
          this.change = !true;
        }

        removeLoc(loc, i: number) {
          loc.order_id = this.sub;
          this.multiLocs.splice(i, 1);
        }

        addCatItems() {
          this.catalogItems.push({
          name: '',
          specification: '',
          prefered_vendor: '',
          quantity: '',
          unit_type: '',
          price: '',
          currency: '',
          custom_type: '',
          comment: ''
          });
        }

        removeCatItems(i: number) {
          this.catalogItems.splice(i, 1);
        }

        logCatValue() {
          console.log(this.catalogItems);
        }



        insert(item: any) {
          this.logValue();
          this.finalItem.push(item);
          this.toggleSelected = !true;
        }




        toggleDisplay(product: string) {
          this.isShow = false;
          console.log('product name', product);
          this.selectedCatalog = this.catalog.filter(item => item.name === product);
          console.log('products-', this.selectedCatalog);
        }

        orderItem(product: any)
        {
          console.log('product- ', product);
          this.finalItem.push(product);
          this.toggleSelected = !true;
        }

        removeOrderItem(item, i: number) {
          item.order_id = this.sub;
          this.finalItem.splice(i, 1);
        }

        itemSelect(option: any) {
          console.log('option', option);
          if (option === 'new')
          {
            this.new = false;
            this.catalogDisplay = true;
          }
          else if (option === 'catalog')
          {
            this.new = true;
            this.catalogDisplay = false;
          }
        }

        orderDecision(status, decision, refresher) {
          this.order.status = status;
          this.order.message = decision;
          this.order.action = 'delete';
          this.http.post('http://localhost/My Project/ionic2php/deleteorder.php', this.order).subscribe((data: any[]) => {
          this.order.multiLocs = this.multiLocs;
          this.order.finalItem = this.finalItem;
          this.order.action = 'insert';
          console.log(data);
          this.http.post('http://localhost/My Project/ionic2php/addOrder.php', this.order).subscribe((data: any) =>{
            console.log(data);
            this.router.navigate(['/request']);
          });
          }, err => {
          console.log(err);
          });
          }

            doRefresh(refresher) {
              console.log('Begin async operation', refresher);

              setTimeout(() => {
                console.log('Async operation has ended');
                this.ngOnInit();
                refresher.target.complete();
              }, 2000);
            }

}
