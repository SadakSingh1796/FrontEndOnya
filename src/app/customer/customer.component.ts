import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OnyaComponent } from 'app/onya/onya.component';
import { AccountService } from 'app/Service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogCusDocumentComponent } from './dialog-cus-document/dialog-cus-document.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  _customerList: any = [];
  _userStaus: boolean = false;
  userId: any
  _documentsList: any;
  // @Input() userId: any
  _isVerify: boolean = false;
  constructor(private route: Router, private accountService: AccountService, private spinnerService: NgxSpinnerService,) {
    this.getUsers()
  }

  getUsers() {
    this.spinnerService.show();
    this.accountService.getUsers().subscribe({
      next: (result: any) => {
        this._customerList = result.body.data
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


  ngOnInit(): void {
  }
  // openPopUp() {
  //   this.showDialog = true;
  //   this.dummy='Sadak'
  // }
  closePopUp() {
    // this.showDialog = false;
    window.location.reload();
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
}
