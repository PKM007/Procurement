import { Injectable } from '@angular/core';
import { PO, IPO } from '../app/po';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class POService {

  constructor(private http: HttpClient,
              private router: Router) { }


  addPO(po: any)
  {
    // this.delItem(item.item_id);
    po.action = 'insert';
    console.log(po);
    this.http.post('http://localhost/My Project/ionic2php/addPO.php', po).subscribe(data => {
    console.log(data);
    this.router.navigate(['/requisitionHome']);
    }, err => {
      console.log(err);
      });
   }



   getPOByStatus(status: any): Observable<IPO[]>
   {
     let params = new HttpParams().set('status', status);
     return this.http.get<IPO[]>('http://localhost/My Project/ionic2php/getPOByStatus.php', { params: params });
   }

   getPOItemByStatus(status: any): Observable<IPO[]>
   {
     let params = new HttpParams().set('status', status);
     return this.http.get<IPO[]>('http://localhost/My Project/ionic2php/getPOItemByStatus.php', { params: params });
   }


   getPOCount(): Observable<number>
   {
     return this.http.get<number>('http://localhost/My Project/ionic2php/getPOCount.php');
   }

   getStatusPOCount(status: any): Observable<number>
   {
     let params = new HttpParams().set('status', status);
     return this.http.get<number>('http://localhost/My Project/ionic2php/countStatusPO.php', { params: params });
   }

   getPoByBillNo(billNo: any): Observable<IPO>
   {
    let params = new HttpParams().set('billNo', billNo);
    return this.http.get<IPO>('http://localhost/My Project/ionic2php/getPOByBillNo.php', { params: params });
   }

   getAttachmentsByBillNo(billNo: any): Observable<string[]>
   {
    let params = new HttpParams().set('billNo', billNo);
    return this.http.get<string[]>('http://localhost/My Project/ionic2php/getAttachementsByBillNo.php', { params: params });
   }


   getInvoiceByBillNo(billNo: any): Observable<IPO>
   {
    let params = new HttpParams().set('billNo', billNo);
    return this.http.get<IPO>('http://localhost/My Project/ionic2php/getInvoiceByBillNo.php', { params: params });
   }


   getInvoiceByItemId(item_id: any): Observable<IPO>
   {
    let params = new HttpParams().set('item_id', item_id);
    return this.http.get<IPO>('http://localhost/My Project/ionic2php/getInvoiceByItemId.php', { params: params });
   }
}
