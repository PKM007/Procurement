import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { POService } from '../po.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CheckPOComponent } from '../check-po/check-po.component';

@Component({
  selector: 'app-potrack',
  templateUrl: './potrack.component.html',
  styleUrls: ['./potrack.component.scss']
})
export class POTrackComponent implements OnInit {

  item: any = {};

  sub: any;
  po: any;
  imageNames: any = [];
  isLinear = false;

  constructor(private router: Router,
              private message: MessageService,
              private poService: POService,
              private http: HttpClient,
              private dialog: MatDialog) { }

  ngOnInit() {



    this.message.currentMessage.subscribe(message => this.sub = message);

    this.poService.getPoByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.po = data[0];
    });

    this.poService.getAttachmentsByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.imageNames = data;
    });

  }


  send() {
    this.item.billNo = this.sub;
    this.item.action = 'update';
    this.item.order_id = this.po.order_id;
    this.item.item_id = this.po.item_id;
    this.item.tracking_link = this.po.tracking_link;
    this.item.estimated_arrival = this.po.estimated_arrival;
    this.item.order_status = this.po.po_status;
    this.item.order_msg = this.po.message_client;
    console.log(this.item);
    this.http.post('http://localhost/My Project/ionic2php/trackPO.php', this.item).subscribe((data: any) =>{
      console.log(data);
      this.router.navigate(['/approvedPO']);
    }, err => {
    console.log(err);
    });

  }

  seePO()
{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(CheckPOComponent, dialogConfig);
}
}
