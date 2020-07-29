import { Injectable } from '@angular/core';
import { Order, IOrder } from '../app/order';
import { Status, IStatus } from '../app/status';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: any = [];

today = new Date();
dd = String(this.today.getDate()).padStart(2, '0');
mm = String(this.today.getMonth() + 1).padStart(2, '0');
yyyy = this.today.getFullYear();

d1 = this.mm + '/' + this.dd + '/' + this.yyyy;

  private orders:Array<Order> = [
    { order_id: 1232, created_by: 'Harshit Singh', date: this.d1, order_desc: 'Sample Order 1', status: 'pending' , message: 'Request submitted for review'},
    { order_id: 3232, created_by: 'Alec', date: this.d1, order_desc: 'Sample Order 3', status: 'pending' , message: 'Request submitted for review'},
    { order_id: 4545, created_by: 'Alexender', date: this.d1, order_desc: 'Sample Order 2', status: 'pending' , message: 'Request submitted for review'}
  ];

  constructor(private http: HttpClient) { }

  // getOrderById(order_id:number):Observable<IOrder>{
  //   var order = this.orders.find(item => item.order_id === order_id);
  //   return of(order);
  // }

  getOrderById(order_id: any):Observable<IOrder>{
    let params = new HttpParams().set('order_id', order_id);
    return this.http.get<IOrder>('http://localhost/My Project/ionic2php/getOrderById.php', { params: params });
    // this.requestedItem = this.items[0];
    // this.item = this.requestedItem.filter(item => item.item_id === item_id);
    // console.log(this.item);
    // return of(this.item);
  }

  getStatusById(order_id: any):Observable<IStatus>{
    let params = new HttpParams().set('order_id', order_id);
    return this.http.get<IStatus>('http://localhost/My Project/ionic2php/getStatusById.php', { params: params });
    // this.requestedItem = this.items[0];
    // this.item = this.requestedItem.filter(item => item.item_id === item_id);
    // console.log(this.item);
    // return of(this.item);
  }

  getOrderByStatus(status: string):Observable<IOrder>{
    let params = new HttpParams().set('status', status);
    return this.http.get<IOrder>('http://localhost/My Project/ionic2php/getOrderByStatus.php', { params: params });
  }

  // getAllOrders():Observable<IOrder[]>{
  //   console.log(this.orders);
  //   return of(this.orders);
  // }

  getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('http://localhost/My Project/ionic2php/json.php');
    }

  replicateOrder(order: any): void {
    order.action = 'insert';
    console.log(order);
    this.http.post('http://localhost/My Project/ionic2php/order.php', order).subscribe(data => {
    console.log(data);
    // window.location.reload();
    // this.router.navigate(['/supplierItems']);
    }, err => {
    console.log(err);
    });
  }


  addOrder(order: any): Observable<string> {
    order.action = 'insert';
    console.log(order);
    return this.http.post<string>('http://localhost/My Project/ionic2php/order.php', order);
  }

  deleteOrder(val: any): void {
    var indexes = [];
    for (var i = 0; i < this.orders.length; i++) {
        if (this.orders[i].order_id === val) {
            indexes.push(i);
        }
    }



    for (var i = 0; i < indexes.length; i++) {
      indexes[i] = indexes[i] - i;
      this.orders.splice(indexes[i], 1);
  }

  console.log("Order Service Data-",this.getAllOrders());
    // const index = this.orders.findIndex(item => item.order_id === order.order_id);
    // this.orders.splice(index,1);
  }

  updateOrder(order:IOrder):void{

    const index=this.orders.findIndex(item => item.order_id === order.order_id);
    this.orders[index]= order;
  }

  editOrder(order: any): Observable<string>
  {
    // this.delItem(item.item_id);
    order.action = 'insert';
    console.log(order);
    return this.http.post<string>('http://localhost/My Project/ionic2php/editOrder.php', order);
  }

  getAllOrderCount(): Observable<number>
  {
    return this.http.get<number>('http://localhost/My Project/ionic2php/countOrder.php');
  }

  getStatusOrderCount(status: any): Observable<number>
  {
    let params = new HttpParams().set('status', status);
    return this.http.get<number>('http://localhost/My Project/ionic2php/countStatusOrder.php', { params: params });
  }
}
