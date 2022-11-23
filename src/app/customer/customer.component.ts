import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OnyaComponent } from 'app/onya/onya.component';
import { AccountService } from 'app/Service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from './customer';
import { DialogCusDocumentComponent } from './dialog-cus-document/dialog-cus-document.component';
import { ProductService } from './productservice';
import * as FileSaver from 'file-saver';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  products: Product[];
  rangeDates: Date[];
  cols: any = [

    // { field: 'name', header: 'Name' },
    // { field: 'email', header: 'Email' },
    // { field: 'ismobileverified', header: 'Is Mobile Verified' },
    // { field: 'isemailverified', header: 'Is Email Verified' },
    // { field: 'isverifiedbyadmin', header: 'User Status' },
  ];

  _selectedColumns: any[];
  _customerList: any = [];
  _userStaus: boolean = false;
  userId: any
  _documentsList: any;
  _isVerify: boolean = false;
  _customerColoumns: any = [

  ];
  constructor(private productService: ProductService, private route: Router, private accountService: AccountService, private spinnerService: NgxSpinnerService,) {
    this.getUsers()
  }
  ngOnInit(): void {
    // this.productService.getProductsSmall().then(data => this.products = data);

    // this.cols = [
    //   { field: 'name', header: 'Name' },
    //   { field: 'category', header: 'Category' },
    //   { field: 'quantity', header: 'Quantity' }
    // ];

    // this._selectedColumns = this.cols;
  }
  getUsers() {
    this.spinnerService.show();
    this.accountService.getUsers().subscribe({
      next: (result: any) => {
        this._customerList = result.body.data
        this.cols = [
          // { field: 'userid', header: 'ID' },

          { field: 'name', header: 'Name' },
          { field: 'email', header: 'Email' },
          { field: 'phone', header: 'Phone' },
          // { field: 'ismobileverified', header: 'Is Mobile Verified' },
          // { field: 'isemailverified', header: 'Is Email Verified' },
          // { field: 'isverifiedbyadmin', header: 'User Status' },
        ]
        this._customerColoumns = this.cols
        this.spinnerService.hide();
      },
      error: (result: any) => {
        this.spinnerService.hide();
      },
      complete: () => { }
    })
  }
  handleChange(dataa: any, id: any) {
    const data = {
      "userid": id,
      "isverified": dataa.checked
    }
    this.spinnerService.show();
    this.accountService.updateStatus(data).subscribe({
      next: (result: any) => {
        this.spinnerService.hide();
        //this._customerList = result.body.data
      },
      error: (result: any) => {
        this.spinnerService.hide();
      },
      complete: () => { }
    })
  }
  openPopUp(userId: any) {
    this.userId = userId;
    this.showDialog = true;
    // localStorage.removeItem('UserId');
    // localStorage.setItem('UserId', userId);
    this.getUserDocument();
    // const dialogRef = this.dialog.open(DialogCusDocumentComponent);

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }


  showDialog: boolean = false;
  dummy: any = '';



  // openPopUp() {
  //   this.showDialog = true;
  //   this.dummy='Sadak'
  // }
  closePopUp() {
    this.showDialog = false;
    // window.location.reload();
  }
  closeDialog() {
  }
  getUserDocument() {

    // console.log("Upload Cocument "+ localStorage.getItem('UserId'))
    this.accountService.getUserDocument(this.userId).subscribe({
      next: (result: any) => {
        console.log("DDDD" + result.body.data)
        this._isVerify = result.body.data.isverified
        this._documentsList = result.body.data.userDocuments;
      },
      error: (result: any) => {
      },
      complete: () => { }
    })
  }
  handleChanges(data: any) {
    const dd = {
      "userid": parseInt(localStorage.getItem('UserId')),
      "isverified": this._isVerify
    }
    this.accountService.verifyDocument(dd).subscribe({
      next: (result: any) => {
        console.log("DDDD" + result.body.data)
      },
      error: (result: any) => {
      },
      complete: () => { }
    })
  }
  @Input() get selectedColumns(): any[] {
    return this._customerColoumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._customerColoumns = this.cols.filter(col => val.includes(col));
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this._customerList);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "customer");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
