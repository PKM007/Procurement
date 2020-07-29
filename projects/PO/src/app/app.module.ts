import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router} from '@angular/router';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { CreatePOComponent } from './create-po/create-po.component';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule, MatNativeDateModule  } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule, MatOptionModule } from '@angular/material';
import { SeeOrderComponent } from './see-order/see-order.component';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PendingPOComponent } from './pending-po/pending-po.component';
import { ApprovedPOComponent } from './approved-po/approved-po.component';
import { ViewPOComponent } from './view-po/view-po.component';
import { POTrackComponent } from './potrack/potrack.component';
import { CheckPOComponent } from './check-po/check-po.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DeliveredPoComponent } from './delivered-po/delivered-po.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    PurchaseOrderComponent,
    TrackOrderComponent,
    InvoiceComponent,
    CreateInvoiceComponent,
    CreatePOComponent,
    SeeOrderComponent,
    PendingPOComponent,
    ApprovedPOComponent,
    ViewPOComponent,
    POTrackComponent,
    CheckPOComponent,
    DeliveredPoComponent,
    EditInvoiceComponent,
    ViewInvoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatNativeDateModule ,
    MatListModule,
    MatSelectModule,
    MatStepperModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SeeOrderComponent]
})
export class AppModule { }
@NgModule({})
export class POModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [{
        provide: MatDialogRef,
        useValue: []
         },
        {
        provide: MAT_DIALOG_DATA,
        useValue: []
        }]
    }
  }
}
