import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'app/Service/api.service';

@Component({
  selector: 'app-dialog-cus-document',
  templateUrl: './dialog-cus-document.component.html',
  styleUrls: ['./dialog-cus-document.component.scss']
})
export class DialogCusDocumentComponent implements OnInit {
  _documentsList: any;
  @Input() userId: any
  _isVerify: boolean = false;
  constructor(private accountService: AccountService) {
    this.getUserDocument();
  }
  ngOnInit(): void {
  }
  closeDialog() {
  }
  getUserDocument() {

    // console.log("Upload Cocument "+ localStorage.getItem('UserId'))
    this.accountService.getUserDocument(parseInt(localStorage.getItem('UserId'))).subscribe({
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
  handleChange(data: any) {
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
