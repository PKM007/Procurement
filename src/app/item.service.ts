import { Injectable } from '@angular/core';
import { Item, IItem } from '../app/item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  item: any = [];



  // private items:Array<Item> = [
  //   {
  //     order_id: 1232,
  //     name: 'Desktop',
  //     specification: '15 inch',
  //     prefered_vendor: 'Dell',
  //     quantity: 4,
  //     unit_type: 'DX-2323',
  //     price: 23000,
  //     currency: 'INR',
  //     custom_type: 'Windows',
  //     comments: 'Full Setup'
  //   },
  //   {
  //     order_id: 1232,
  //     name: 'Desktop',
  //     specification: '13 inch',
  //     prefered_vendor: 'HP',
  //     quantity: 8,
  //     unit_type: 'HP-2323',
  //     price: 25000,
  //     currency: 'INR',
  //     custom_type: 'Windows',
  //     comments: 'Full Setup'
  //   },
  //   {
  //     order_id: 3232,
  //     name: 'Desktop',
  //     specification: '13 inch',
  //     prefered_vendor: 'HP',
  //     quantity: 6,
  //     unit_type: 'HP-733',
  //     price: 25000,
  //     currency: 'INR',
  //     custom_type: 'Windows',
  //     comments: 'Full Setup'
  //   },
  //   {
  //     order_id: 4545,
  //     name: 'Hard Drive',
  //     specification: '1 TB',
  //     prefered_vendor: 'Toshiba',
  //     quantity: 8,
  //     unit_type: 'T-3232',
  //     price: 3500,
  //     currency: 'INR',
  //     custom_type: 'USB-3.0',
  //     comments: ''
  //   }
  // ];

  constructor(private http: HttpClient) { }

  // getItemById(order_id:number):Observable<IItem[]>{
  //   this.item = this.items.filter(item => item.order_id === order_id);
  //   return of(this.item);
  // }

  // getAllItems():Observable<IItem[]>{
  //   return of(this.items);
  // }

  getAllItems(): Observable<Item[]> {
    return this.http.get<IItem[]>('http://localhost/My Project/ionic2php/getAllItem.php');
  }

  getItemById(order_id: any):Observable<IItem>{
    let params = new HttpParams().set('order_id', order_id);
    return this.http.get<Item>('http://localhost/My Project/ionic2php/getItem.php', { params: params });
    // this.requestedItem = this.items[0];
    // this.item = this.requestedItem.filter(item => item.item_id === item_id);
    // console.log(this.item);
    // return of(this.item);
  }

  getItemByStatus(status: any):Observable<IItem[]> {
    let params = new HttpParams().set('status', status);
    return this.http.get<IItem[]>('http://localhost/My Project/ionic2php/getItemByStatus.php', { params: params });
  }

  getItemByItemId(item_id: any):Observable<IItem>{
    let params = new HttpParams().set('item_id', item_id);
    return this.http.get<Item>('http://localhost/My Project/ionic2php/getItemByItemId.php', { params: params });
  }



  trackItems(order_id: any):Observable<IItem>
  {
    let params = new HttpParams().set('order_id', order_id);
    return this.http.get<Item>('http://localhost/My Project/ionic2php/trackItems.php', { params: params });
    // this.requestedItem = this.items[0];
  }

  // addItem(item: any):void{
  //   console.log("Added item-", item);
  //   for(var i of item)
  //   {
  //     this.items.push(i);
  //   }
  //   //this.items.push(item);
  //   console.log("all item-", this.items);
  // }

  // deleteItem(val: any): void {
  //   var indexes = [];
  //   for (var i = 0; i < this.items.length; i++) {
  //       if (this.items[i].order_id === val) {
  //           indexes.push(i);
  //   }
  // }


  //   for (var i = 0; i < indexes.length; i++) {
  //     indexes[i] = indexes[i] - i;
  //     this.items.splice(indexes[i], 1);

  // }

  // console.log("Item Service Data-",this.getAllItems());
  //   // const index = this.items.findIndex(item => item.order_id === iteem.order_id);
  //   // const deleteLocation = this.items.splice(index, 1);

  // }

  // updateItem(iteem:IItem):void{

  //   const index = this.items.findIndex(item => item.order_id === iteem.order_id);
  //   this.items[index] = iteem;
  // }
}
