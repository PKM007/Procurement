import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { ImageService } from '../image.service';
import { DataService } from '../data.service';
import { MatDialogRef } from '@angular/material';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { EditComponent } from 'src/app/edit/edit.component';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  request: any = {};

  serviceItem: any;
  serviceImage: any;
  imageLength: any = [];
  sampleMan: any = [];
  imageList: any = [];

  sub: any;

  item: any = {};

  myFiles:any [] = [];

  imageNames:any[] = [];

  uploadedImages: any = [];

  image: any;

  change:boolean = false;

  optional:boolean = false;

  requireChange:boolean = true;

  fName: any;
  fType: any;

  message: string;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass = false;


  constructor(private http: HttpClient,
              private router: Router,
              public snackBar: MatSnackBar,
              private itemService: ItemService,
              private imageService: ImageService,
              private data: DataService,
              private activeRoute: ActivatedRoute,
              private dialogRef: MatDialogRef<EditComponent>) {
               }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sub = message);
    this.itemService.getItemById(this.sub).subscribe((data) => {
      this.item = data[0];
      console.log(data);
    });
    // console.log(this.activeRoute.snapshot.data.editItem);
    // // this.imageList = this.activeRoute.snapshot.data.items[0];
    // this.item = this.activeRoute.snapshot.data.editItem;
    // this.itemService.getItemById(this.sub).subscribe((data: any[]) => {
    //   this.item = data[0];
    //   console.log(data);
    // });

    this.imageService.getImageById(this.sub).subscribe((data) => {
      this.serviceImage = data;
      console.log(data);
    for(let i = 0 ; i < data.length ; i++ )
    {
    this.imageNames.push(this.serviceImage[i].imageName);
    }
    });
    // console.log(this.imageList['0']);
    // this.imageNames = this.imageList;
    // this.imageNames = this.removeDuplicates(this.imageNames);

  }

  insert() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
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
    this.imageNames = this.removeDuplicates(this.imageNames);
    console.log(this.imageNames);
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
        alert('Uploaded Successfully.');
      }, err => {
        this.change = true;
          console.log(err);
          });
    this.change = false;
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
    this.imageNames.splice(i, 1);
    console.log(this.imageNames);
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

  editItem()
  {
    this.item.action = 'insert';
    this.item.uploadedImages = this.imageNames;
    this.request.action = 'delete';
    this.request.item_id = this.item.item_id;
    console.log(this.request);
    this.http.post('http://localhost/My Project/ionic2php/deleteItemById.php', this.request).subscribe((data: any[]) => {
    console.log(data);
    this.message = 'Edited Sucessfully';
    this.insert();
    this.itemService.editItem(this.item);
    this.dialogRef.close();
    }, err => {
    console.log(err);
    }
    );


  }

}
