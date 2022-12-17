import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'app/Service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  _createBusinessForm: FormGroup
  _businessAccList: any = [];
  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private spinnerService: NgxSpinnerService) {
    this._createBusinessForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required]))
    });
    this.getBusinessAccount();
  }

  ngOnInit(): void {
  }
  createBusiness() {
    if(this._createBusinessForm.valid){
      const data = {
        "name": this._createBusinessForm.controls['name'].value,
        "email": this._createBusinessForm.controls['email'].value,
        "phonenumber": JSON.stringify(this._createBusinessForm.controls['phone'].value),
        "password": this._createBusinessForm.controls['password'].value
      }
      this.spinnerService.show();
      this.accountService.createBusiness(data).subscribe({
        next: (result: any) => {
          this._createBusinessForm.reset();
          this.getBusinessAccount();
          this.spinnerService.hide();
        },
        error: (result: any) => {
          this.spinnerService.hide();
        },
        complete: () => { }
      })
    }
   
  }
  getBusinessAccount() {
    this.accountService.getBusinessAcc().subscribe({
      next: (result: any) => {
        this._businessAccList = result.body.data
      },
      error: (result: any) => {
      },
      complete: () => { }
    })
  }
  handleChange(dataa:any){
    const data = {
      "accountid":dataa.accountid,
      "isactive":dataa.isactive
  }
    this.spinnerService.show();
    this.accountService.updateBusinness(data).subscribe({
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
}
