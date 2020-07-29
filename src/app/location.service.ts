import { Injectable } from '@angular/core';
import { Location, ILocation } from '../app/location';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  location:any = [];




  // private locations:Array<Location> = [
  //   { order_id: 1232, location: 'Delhi', department: 'HR'},
  //   { order_id: 3232, location: 'Mumbai', department: 'Testing'},
  //   { order_id: 4545, location: 'Chennai', department: 'Management'},
  //   { order_id: 1232, location: 'Hyderabad', department: 'Technical'}
  // ];

  constructor(private http: HttpClient) { }

  // getLocationById(order_id:number):Observable<ILocation[]>{
  //   this.location = this.locations.filter(item => item.order_id === order_id);

  //   return of(this.location);
  // }

  // getAllLocations():Observable<ILocation[]>{
  //   return of(this.locations);
  // }

  getAllLocations():Observable<ILocation[]>{
    return this.http.get<ILocation[]>('http://localhost/My Project/ionic2php/getLocation.php');
  }

  getLocationById(order_id: any):Observable<ILocation>{
    let params = new HttpParams().set('order_id', order_id);
    return this.http.get<ILocation>('http://localhost/My Project/ionic2php/getLocationById.php', { params: params });
    // this.requestedItem = this.items[0];
    // this.item = this.requestedItem.filter(item => item.item_id === item_id);
    // console.log(this.item);
    // return of(this.item);
  }

  // addLocation(location: any):void{
  //   console.log("Added loaction-", location);
  //   for(var loc of location)
  //   {
  //     this.locations.push(loc);
  //   }
  //   // this.locations.push(location);
  //   console.log("All loaction-", this.locations);
  // }

  // deleteLocation(val: any): void {
  //   // tslint:disable-next-line: one-variable-per-declaration
  //   var indexes = [];
  //   for (var i = 0; i < this.locations.length; i++) {
  //       if (this.locations[i].order_id === val) {
  //           indexes.push(i);
  //       }
  //   }



  //   for (var i = 0; i < indexes.length; i++) {
  //     indexes[i] = indexes[i] - i;
  //     this.locations.splice(indexes[i], 1);
  // }

  // console.log("Location Service Data-",this.getAllLocations());


  //   // const index = this.locations.findIndex(item => item.order_id === location.order_id);
  //   // this.locations.splice(index, 1);
  // }

  // updateLocation(location:ILocation):void{

  //   const index = this.locations.findIndex(item => item.order_id === location.order_id);
  //   this.locations[index] = location;
  // }
}
