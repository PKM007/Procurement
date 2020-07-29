import { Injectable } from '@angular/core';
import { Image, IImage } from '../app/image';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  image: any = [];
  requestedImage: any;


  private images: Array<Image> = [];

  constructor(private http: HttpClient) { }

  getImageById(item_id: any):Observable<IImage[]>{
    let params = new HttpParams().set('item_id', item_id);
    return this.http.get<IImage[]>('http://localhost/My Project/ionic2php/getIemImagesById.php', { params: params });
  }

  getAllImages():Observable<IImage[]>{
    return this.http.get<IImage[]>('http://localhost/My Project/ionic2php/getItemImages.php');
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
