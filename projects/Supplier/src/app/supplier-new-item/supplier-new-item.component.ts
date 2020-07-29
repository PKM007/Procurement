import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-supplier-new-item',
  templateUrl: './supplier-new-item.component.html',
  styleUrls: ['./supplier-new-item.component.scss']
})
export class SupplierNewItemComponent implements OnInit {

  item: any = {};

  myFiles:string [] = [];

  imageNames:string[] = [];

  uploadedImages: any = [];

  image: any;

  change:boolean = true;

  optional:boolean = false;

  requireChange:boolean = true;

  fName: any;
  fType: any;


  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
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

  addItem()
  {
    this.item.action = 'insert';
    this.item.uploadedImages = this.uploadedImages;
    console.log(this.item);
    this.http.post('http://localhost/My Project/ionic2php/addItem.php', this.item).subscribe(data => {
    console.log(data);
    this.router.navigate(['/supplierItems']);
    }, err => {
    console.log(err);
    });

  }

}
