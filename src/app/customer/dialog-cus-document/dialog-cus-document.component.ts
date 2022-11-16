import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'app/Service/api.service';

@Component({
  selector: 'app-dialog-cus-document',
  templateUrl: './dialog-cus-document.component.html',
  styleUrls: ['./dialog-cus-document.component.scss']
})
export class DialogCusDocumentComponent implements OnInit {
  _documentsList: any = [];
  constructor(private accountService: AccountService) {
    this.getUserDocument();
  }
  ngOnInit(): void {
  }
  closeDialog() {
  }
  getUserDocument() {
    this.accountService.getUserDocument(1).subscribe({
      next: (result: any) => {
        this._documentsList = result.body.data;
      },
      error: (result: any) => {
      },
      complete: () => { }
    })
  }

}
