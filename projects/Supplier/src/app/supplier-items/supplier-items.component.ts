import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { ItemService } from '../item.service';
import { ImageService } from '../image.service';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CSVComponent } from '../csv/csv.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'app-supplier-items',
  templateUrl: './supplier-items.component.html',
  styleUrls: ['./supplier-items.component.scss']
})
export class SupplierItemsComponent implements OnInit {
  resolverItem: any[] = [];
  sub: any;
  item: any = {};
  images: any;
  imageList: any = [];
  itemList: any = [];
  dataSource: any;
  uploadedImages: any = [];

  message: string;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass = false;

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['Item ID', 'Name', 'SKU', 'Brand', 'Price', 'Currency', 'Features', 'DiscountRate', 'Warranty', 'ReplacementPolicy', 'Location', 'edit', 'delete', 'replicate'];

  constructor(private itemService: ItemService,
              public snackBar: MatSnackBar,
              private imageService: ImageService,
              private data: DataService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.itemList.push(data);
    });

    this.imageService.getAllImages().subscribe(data => {
      this.imageList.push(data);
    });
    // this.resolverItem = this.activeRoute.snapshot.data.items;
    // console.log(this.resolverItem.values());
    // console.log(this.resolverItem.entries());
    // console.log('item-', this.resolverItem);
    // this.getData();
    this.data.currentMessage.subscribe(message => this.sub = message);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
      refresher.target.complete();
    }, 2000);
  }

  doLoad()
  {
    window.location.reload();
  }

  insert() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  getData() {
    this.itemService.getItems().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  onReplicate(item_id: string, refresher)
  {
    // this.itemService.getItemById(item_id).subscribe((data) => {
    //   this.item = data[0];
    //   console.log(data);
    // });
    this.itemList = this.itemList["0"];
    console.log(this.itemList);

    this.item = this.itemList.filter(item => item.item_id === item_id);
    this.item = this.item[0];
    console.log(this.item);
    this.imageList = this.imageList["0"];
    console.log(this.imageList);

    this.images = this.imageList.filter(item => item.item_id === item_id);
    console.log(this.images);
    if(this.images.length)
    {
    for(let image of this.images)
    {
      this.uploadedImages.push(image.imageName);
    }

    this.item.uploadedImages = this.uploadedImages;
  }

  else
  {
    this.item.uploadedImages = "null";
  }



    // this.imageService.getImageById(item_id).subscribe((data) => {
    //   this.serviceImage = data;
    //   console.log(data);
    // for(let i = 0 ; i < data.length ; i++ )
    // {
    // this.imageList.push(this.serviceImage[i].imageName);
    // }
    // console.log('ye hai images', this.imageList);
    // if(data.length != 0)
    // {
    //   this.item.uploadedImages = this.imageList;
    // }
    // else
    // {
    //   this.item.uploadedImages = 'null';
    // }
    // });

    // this.imageService.getImageById(item_id).subscribe((data) => {
    //   this.imageLength = data.length;
    //   this.serviceImage = data;
    //   console.log(data);
    // });
    // for(let i = 0 ; i < this.imageLength ; i++ )
    // {
    // this.imageList.push(this.serviceImage[i].imageName);
    // }
    // console.log(this.imageList);
    // console.log(this.imageList.length);
    // if(this.imageList.length != 0)
    // {
    //   this.item.uploadedImages = this.imageList;
    // }
    // else
    // {
    //   this.item.uploadedImages = 'null';
    // }

    console.log(this.item);

    this.itemService.replicateItem(this.item);

    this.message = 'Replicated Sucessfully';
    this.insert();
    this.doRefresh(refresher);

  }


  onDelete(item_id: any, refresher)
  {
    this.itemService.delItem(item_id);
    this.message = 'Deleted Sucessfully';
    this.insert();
    this.doRefresh(refresher);
  }

  onEdit(item_id: any, refresher)
  {
    this.sub = item_id;
    this.data.changeMessage(this.sub);
    // this.router.navigate(['/editItem']);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(EditItemComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      // Do stuff after the dialog has closed
      // this.message = 'Item Edited from Sucessfully';
      // this.insert();
      this.doRefresh(refresher);
  });
  }

  addCSV(refresher)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    const dialog = this.dialog.open(CSVComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      // Do stuff after the dialog has closed
      this.doRefresh(refresher);
  });
  }

}
