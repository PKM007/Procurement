import { Injectable } from '@angular/core';
import { Item, IItem } from '../app/item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MoveService } from './move.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  allItems: any = [];
  sampleItems: any = [];

  item: any = [];
  requestedItem: any;
  request: any = {};


  items: Array<Item> = [];

  constructor(private http: HttpClient,
              private router: Router,
              private moveService: MoveService) { }

  getItemById(item_id: any):Observable<IItem>{
    let params = new HttpParams().set('item_id', item_id);
    return this.http.get<IItem>('http://localhost/My Project/ionic2php/getItemById.php', { params: params });
    // this.requestedItem = this.items[0];
    // this.item = this.requestedItem.filter(item => item.item_id === item_id);
    // console.log(this.item);
    // return of(this.item);
  }


  getAllItems() {
    this.http.get('http://localhost/My Project/ionic2php/getSupplierItem.php').subscribe((data: Item) => {
      this.items.push(data);
    });
    console.log(this.items);
  }

  replicateItem(item: any)
  {
    item.action = 'insert';
    console.log(item);
    this.http.post('http://localhost/My Project/ionic2php/addItem.php', item).subscribe(data => {
    console.log(data);
    // window.location.reload();
    // this.router.navigate(['/supplierItems']);
    }, err => {
    console.log(err);
    });
  }

  delItem(item_id: any)
  {
    this.request.action = 'delete';
    this.request.item_id = item_id;
    console.log(this.request);
    this.http.post('http://localhost/My Project/ionic2php/deleteItemById.php', this.request).subscribe((data: any[]) => {
    console.log(data);
    }, err => {
    console.log(err);
    });
  }

  editItem(item: any)
  {
    // this.delItem(item.item_id);
    item.action = 'insert';
    console.log(item);
    this.http.post('http://localhost/My Project/ionic2php/editItem.php', item).subscribe(data => {
    console.log(data);
    // this.router.navigate(['/supplierItems']);
    }, err => {
    console.log(err);
    });
  }

  addItemByCSV(item: any)
  {
    item.action = 'insert';
    console.log(item);
    this.http.post('http://localhost/My Project/ionic2php/addItembyCSV.php', item).subscribe(data => {
    console.log(data);
    }, err => {
    console.log(err);
    });
  }

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>('http://localhost/My Project/ionic2php/getSupplierItem.php');
  }


  getItemCount(): Observable<number>
  {
    return this.http.get<number>('http://localhost/My Project/ionic2php/countItem.php');
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
