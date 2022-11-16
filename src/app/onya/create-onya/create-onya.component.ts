import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-onya',
  templateUrl: './create-onya.component.html',
  styleUrls: ['./create-onya.component.scss']
})
export class CreateOnyaComponent implements OnInit {
  _createOnyaForm: FormGroup;
  _typeOfMemberShip:any=[];
  _validTill:any=[];
  constructor(private formBuilder: FormBuilder,) {
    this._createOnyaForm = this.formBuilder.group({
      userid: new FormControl('', Validators.compose([Validators.required])),
      packagesize: new FormControl('', Validators.compose([Validators.required])),
      packageweight: new FormControl('', Validators.compose([Validators.required])),
      packagetype: new FormControl('', Validators.compose([Validators.required])),
      comments: new FormControl('', Validators.compose([Validators.required])),
      pickupdate: new FormControl('', Validators.compose([Validators.required])),
      pickuplat: new FormControl('', Validators.compose([Validators.required])),
      pickuplong: new FormControl('', Validators.compose([Validators.required])),
      pickupaddress: new FormControl('', Validators.compose([Validators.required])),
      droplat: new FormControl('', Validators.compose([Validators.required])),
      droplong: new FormControl('', Validators.compose([Validators.required])),
      dropaddress: new FormControl('', Validators.compose([Validators.required])),
      pickuppoint: new FormControl('', Validators.compose([Validators.required])),
      droppoint: new FormControl('', Validators.compose([Validators.required])),
      pickupslot: new FormControl('', Validators.compose([Validators.required])),
      dropslot: new FormControl('', Validators.compose([Validators.required])),
      receivername: new FormControl('', Validators.compose([Validators.required])),
      receiveremail: new FormControl('', Validators.compose([Validators.required])),
      receiverphone: new FormControl('', Validators.compose([Validators.required])),
      amount: new FormControl('', Validators.compose([Validators.required])),
      cancounter: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required])),
      images: new FormControl([], Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void {
  }

}
