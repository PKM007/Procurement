import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../src/app/data.service';
import { ItemService } from '../../../../../src/app/item.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {
  sub2: any;
  sub: any;
  items: any;

  constructor(private data: DataService,
              private itemService: ItemService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sub = message);
    this.messageService.currentMessage.subscribe(message => this.sub2 = message);

    this.itemService.trackItems(this.sub).subscribe((data: any) => {
      this.items = data;
      console.log(this.items);
    });
  }

  getInvoice(item_id)
  {
    console.log(item_id);
    this.sub2 = item_id;
    this.messageService.changeMessage(this.sub2);
    this.router.navigate(['/invoiceView']);
  }

}
