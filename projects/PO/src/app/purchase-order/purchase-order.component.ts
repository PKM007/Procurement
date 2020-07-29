import { Component, OnInit } from '@angular/core';
import { Po3Service} from '../po3.service';
import {Po3} from '../po3';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { ItemService } from '../../../../../src/app/item.service';
import { OrderService } from '../../../../../src/app/order.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SeeOrderComponent } from '../see-order/see-order.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { POService } from '../po.service';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

// function billFill()
// {
//   //alert ("the function is"+x);
//   var x = document.getElementById("bill_no").textContent;
//   //document.getElementsByName("bill_num").any = parseInt(x)+1;
//   //alert(x);
//   document["purchase_order"]["bill_num"].value= parseInt(x)+1;
// }

// function verify_date()
// {
//   let x= Date.parse(document["purchase_order"]["required_by"]);
//   if(x>=Date.now())
//     return true;
//   else
//     return false;
// }

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {


  myFiles:string [] = [];

  imageNames:string[] = [];

  uploadedImages: any = [];

  image: any;

  change:boolean = true;

  optional:boolean = false;

  requireChange:boolean = true;

  fName: any;
  fType: any;

  po: any = {};

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  total: any;
  order: any;

  sub: any;
  item: any;


  message1: string;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass = false;

  // bill_no: Po3[];
  // num: any;
  // submitted= false;
  constructor(private _po3Service: Po3Service,
    private _formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    private message: MessageService,
    private itemService: ItemService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private http: HttpClient,
    private poService: POService) { }

  ngOnInit() {
// this.purchase_order = this.formBuilder.group({
//   bill_num: ['', Validators.required],
//   currency: ['', Validators.required],
//   org_billed: ['', Validators.required],
//   cmp_name: ['', Validators.required],
//   location: ['', Validators.required],
//   bill_to_address: ['', Validators.required],
//   deliver_to: ['', Validators.required],
//   required_by: ['', [Validators.required, verify_date]],
//   deliver_address: ['', [Validators.required, Validators.maxLength(150)]],
//   cost_booking: ['', Validators.required],
//   req_name: ['', Validators.required],
//   reason: ['', [Validators.required, Validators.maxLength(150)]],
//   comments: ['', Validators.maxLength(150)],
//   behalf: ['', Validators.required, Validators.maxLength(30)],
//   purchase_type: ['', Validators.required],
//   msg: ['', [Validators.required, Validators.maxLength(150)]],
//   message: ['', [Validators.required, Validators.maxLength(150)]],
//   cost_center: ['', [Validators.required, Validators.maxLength(30)]],
//   budget_code: ['', [Validators.required, Validators.maxLength(30)]],
//   item_name: ['', [Validators.required, Validators.maxLength(30)]],
//   quantity: ['', Validators.required],
//   price_per_unit: ['', Validators.required],
//   total_price: ['', Validators.required]
// })

//     this._po3Service.getMaxbillNo()
//     .subscribe((data: Po3[]) => {
//     this.bill_no = data;
//     this.num= this.bill_no[0]["bill_no"];
//     console.log(this.bill_no[0]["bill_no"]);
//     console.log(this.num);
//   });

this.poService.getPOCount().subscribe((data: any) => {
  this.po.billNo = data + 1;
});

this.message.currentMessage.subscribe(message => this.sub = message);
this.itemService.getItemByItemId(this.sub).subscribe((data: any) => {
  this.item = data[0];
  console.log(this.item);
  this.sub = this.item.order_id;
  this.message.changeMessage(this.sub);
  this.total = this.item.price * this.item.quantity;
});


this.firstFormGroup = this._formBuilder.group({
  reqName: ['', Validators.required],
  urg_msg: ['', Validators.required],
  attachments: ['', Validators.required],
  reason: ['', Validators.required],
  comment: ['', Validators.required],
  behalf: ['', Validators.required],
  purchase_type: ['', Validators.required],
  message: ['', Validators.required],
});
this.secondFormGroup = this._formBuilder.group({
  billno: ['', Validators.required],
  currency: ['', Validators.required],
  org_billed: ['', Validators.required],
  cmp_name: ['', Validators.required],
  location: ['', Validators.required],
  bill_to_address: ['', Validators.required],
  delivery_to: ['', Validators.required],
  required_by: ['', Validators.required],
  delivery_address: ['', Validators.required],
});

this.thirdFormGroup = this._formBuilder.group({
  cost_center: ['', Validators.required],
  project_code: ['', Validators.required],
  budget_code: ['', Validators.required],
});

this.fourthFormGroup = this._formBuilder.group({
  item_name: ['', Validators.required],
  quantity: ['', Validators.required],
  price: ['', Validators.required],
  total: ['', Validators.required],
});



}

insert() {
  const config = new MatSnackBarConfig();
  config.verticalPosition = this.verticalPosition;
  config.horizontalPosition = this.horizontalPosition;
  config.duration = this.setAutoHide ? this.autoHide : 0;
  this.snackBar.open(this.message1, this.action ? this.actionButtonLabel : undefined, config);
}

onFileChange(event) {
  for (var i = 0; i < event.target.files.length; i++) {
    const name = event.target.files[i].name;
    let sample = String(name);
    // console.log(sample[0]);
    // if(this.imageNames.find(sample))
    // {
    //   console.log("Repeated File");
    // }
    // else
    // {
    this.myFiles.push(event.target.files[i]);
    this.imageNames.push(sample);
    // }
  }
  console.log(this.myFiles);
  console.log(this.imageNames);
  this.imageNames=this.removeDuplicates(this.imageNames);
  this.change = true;
}

onUpload() {

  const formData = new FormData();

  for (var i = 0; i < this.myFiles.length; i++) {
    formData.append("file[]", this.myFiles[i]);
  }

  this.http.post('http://localhost/My Project/ionic2php/upload.php', formData)
    .subscribe(res => {
      console.log(res);
      this.uploadedImages = res;
      alert('Uploaded Successfully.');
      this.change = false;
    }, err => {
      this.change = true;
        console.log(err);
        });

}

removeImage(i: number)
{
  console.log(this.imageNames[i]);
  let params = new HttpParams().set('fileName', this.imageNames[i]);
  this.http.get('http://localhost/My Project/ionic2php/deleteItemImage.php', { params: params }).subscribe( data => {
    console.log(data);
    }, err => {
      JSON.parse(JSON.stringify(err));
    });
  this.uploadedImages.splice(i, 1);
  this.imageNames.splice(i, 1);
  console.log(this.imageNames);
  console.log(this.uploadedImages);
}

onReset()
{
  this.image = null;
}

removeDuplicates(arr)
{
  var newarr = (function(arr){
    var m = {}, newarr = []
    for (var i=0; i<arr.length; i++) {
      var v = arr[i];
      if (!m[v]) {
        newarr.push(v);
        m[v]=true;
      }
    }
    return newarr;
  })(arr);

  return newarr;
}

disableFields()
{
  this.optional = !this.optional;
  this.requireChange = !this.requireChange;
  this.fName = null;
  this.fType = null;
}
// onClick()
//   {
//     billFill();
//   }
// onSubmit()
// {
//   this.submitted= true;
//   //on invalid

//   if(this.purchase_order.invalid || verify_date()==false)
//     return;
//   else
//     alert("Successful submission");
//   /*this._po3Service.new_po(this.purchase_order.value)
//   .subscribe(data => {
//     this.router.navigate(['track-order']);
//   })*/
//   console.log(this.purchase_order.value);
// }
// cal_total()
// {
//   //alert("inside function");
//   var quantity=parseInt(document["purchase_order"]["quantity"].value);
//   var ppu=parseInt(document["purchase_order"]["price_per_unit"].value);
//   var total = quantity*ppu;
//   //alert(quantity+" "+ppu+" "+total);
//   document["purchase_order"]["total_price"].value=total;
// }

seeOrder()
{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(SeeOrderComponent, dialogConfig);
}

onSubmit()
{
  if(!this.firstFormGroup.valid)
  {
    this.findInvalidControls(this.firstFormGroup);
    alert('Basic Details Form Is Invalid!');
  }
  if(!this.secondFormGroup.valid) {
    this.findInvalidControls(this.secondFormGroup);
    alert('Billing Details Form Is Invalid!');
  }

  if(!this.thirdFormGroup.valid)
  {
    this.findInvalidControls(this.thirdFormGroup);
    alert('Cost Booking Form Is Invalid!');
  }

  if(!this.fourthFormGroup.valid)
  {
    this.findInvalidControls(this.fourthFormGroup);
    alert('Intem Info Form Is Invalid!');
  }
  if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid)
  {
    this.po.attachments = this.imageNames;
    this.po.item_id = this.item.id;
    this.po.order_id = this.item.order_id;
    this.po.item_name = this.item.name;
    this.po.quantity = this.item.quantity;
    this.po.price = this.item.price;
    this.po.total = this.total;
    this.poService.addPO(this.po);
    this.message1 = 'PO Added Sucessfully';
    this.insert();
  }
}

findInvalidControls(form: any) {
  const invalid = [];
  const controls = form.controls;
  for (const name in controls) {
      if (controls[name].invalid) {
          invalid.push(name);
          controls[name].markAsDirty();
      }
  }
}



}
