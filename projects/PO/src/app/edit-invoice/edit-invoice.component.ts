import { Component, OnInit } from '@angular/core';
import {Invoice3Service} from '../invoice3.service';
import {Invoice3} from '../invoice3';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { parse } from 'querystring';
import { MessageService } from '../message.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CheckPOComponent } from '../check-po/check-po.component';
import { POService } from '../po.service';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  msg: string;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass = false;

  due_date: any;

  date: any;
  item: any = {};

  po: any = {};
  invoice: any = {};

  sub: any;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(private invoice3Service: Invoice3Service,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private message: MessageService,
    private dialog: MatDialog,
    private poService: POService,
    private router: Router,
    private snackBar: MatSnackBar) { }


  ngOnInit() {


  this.message.currentMessage.subscribe(message => this.sub = message);

  this.firstFormGroup = this.formBuilder.group({
    invoice_date: ['', Validators.required],
    invoice_due_date: ['', Validators.required],
    credit_days: ['', Validators.required],
    invoice_address: ['', Validators.required],
    description: ['', Validators.required],
  });
  this.secondFormGroup = this.formBuilder.group({
    item_id: ['', Validators.required],
    item_name: ['', Validators.required],
    item_market_price: ['', Validators.required],
    item_unit_price: ['', Validators.required],
    item_ordered_quantity: ['', Validators.required],
    item_invoiced_quantity: ['', Validators.required],
    item_tax: ['', Validators.required],
  });

  this.poService.getInvoiceByBillNo(this.sub).subscribe((data: any) => {
    console.log(data);
    this.invoice = data[0];
  });



  }


  insert() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.msg, this.action ? this.actionButtonLabel : undefined, config);
  }

  seePO()
  {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = '80%';
      dialogConfig.maxHeight = '90vh';
      const dialog = this.dialog.open(CheckPOComponent, dialogConfig);
  }


  addDateEvent(event)
  {
    this.date = this.convertDate(event.value);
  }

  addDateEvent2(event)
  {
    this.due_date = this.convertDate(event.value);
  }

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  onSubmit() {
    if(this.firstFormGroup.valid && this.secondFormGroup.valid)
    {
      this.invoice.action = 'insert';
      this.invoice.billNo = this.sub;
      this.invoice.item_id =  this.po.item_id;
      this.invoice.item_name =  this.po.item_name;
      this.invoice.invoice_date =  this.date;
      this.invoice.invoice_due_date =  this.due_date;
      console.log(this.invoice);
      this.http.post('http://localhost/My Project/ionic2php/addInvoice.php', this.invoice).subscribe(data => {
        console.log(data);
        this.msg = 'Invoice Created Successfully';
        this.insert();
        this.router.navigate(['/deliveredPO']);
        }, err => {
          console.log(err);
          alert('Sorry try again later');
      });
    }
    else {
      alert('Please fill all the fields');
      for(var control in this.firstFormGroup.controls)
      {
        if(this.firstFormGroup.controls[control].invalid)
        {
          this.firstFormGroup.controls[control].markAsDirty();
        }
      }

      for(var control in this.secondFormGroup.controls)
      {
        if(this.secondFormGroup.controls[control].invalid)
        {
          this.secondFormGroup.controls[control].markAsDirty();
        }
      }

      return;
    }
  }

}
