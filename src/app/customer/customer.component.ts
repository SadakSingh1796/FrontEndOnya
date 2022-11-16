import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OnyaComponent } from 'app/onya/onya.component';
import { AccountService } from 'app/Service/api.service';
import { DialogCusDocumentComponent } from './dialog-cus-document/dialog-cus-document.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  _customerList: any = [];
  _userStaus: boolean = false;
  constructor(private route: Router, private accountService: AccountService) {
    this.getUsers()
  }

  getUsers() {
    this.accountService.getUsers().subscribe({
      next: (result: any) => {
        this._customerList = result.body.data
      },
      error: (result: any) => {
      },
      complete: () => { }
    })
  }
  handleChange(dataa: any,id:any) {
    const data = {
      "userid": id,
      "isverified": dataa.checked
    }
    this.accountService.updateStatus(data).subscribe({
      next: (result: any) => {
        //this._customerList = result.body.data
      },
      error: (result: any) => {
      },
      complete: () => { }
    })
  }
  openPopUp() {
    this.showDialog = true;
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
    this.showDialog = false;
    this.route.navigate(['/onya']);
    this.route.navigate(['/customer']);
  }
}
