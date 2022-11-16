import { Component, OnInit } from '@angular/core';
// import { AccountService } from 'app/Service/api.service';
import * as XLSX from 'xlsx';
import { AccountService } from '../Service/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
declare const google: any;
interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-onya',
  templateUrl: './onya.component.html',
  styleUrls: ['./onya.component.scss']
})
export class OnyaComponent implements OnInit {
  _createOnyaForm: FormGroup;
  _typeOfMemberShip: any = [];
  _validTill: any = [];
  _onyaList: any = [];
  showDialog: boolean = false;
  location: Observable<any>;
  closePopUp() {

  }
  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private route: Router,
  ) {
    debugger
    this.getMapDetail('Amritsar')
    this._createOnyaForm = this.formBuilder.group({
      userid: new FormControl(0, Validators.compose([Validators.required])),
      packagesize: new FormControl('', Validators.compose([Validators.required])),
      packageweight: new FormControl('', Validators.compose([Validators.required])),
      packagetype: new FormControl('', Validators.compose([Validators.required])),
      comments: new FormControl('', Validators.compose([Validators.required])),
      pickupdate: new FormControl('', Validators.compose([Validators.required])),
      pickuplat: new FormControl('', Validators.compose([])),
      pickuplong: new FormControl('', Validators.compose([])),
      pickupaddress: new FormControl('', Validators.compose([Validators.required])),
      droplat: new FormControl('', Validators.compose([])),
      droplong: new FormControl('', Validators.compose([])),
      dropaddress: new FormControl('', Validators.compose([Validators.required])),
      pickuppoint: new FormControl('', Validators.compose([Validators.required])),
      droppoint: new FormControl('', Validators.compose([Validators.required])),
      pickupslot: new FormControl('', Validators.compose([Validators.required])),
      dropslot: new FormControl('', Validators.compose([Validators.required])),
      receivername: new FormControl('', Validators.compose([Validators.required])),
      receiveremail: new FormControl('', Validators.compose([Validators.required])),
      receiverphone: new FormControl('', Validators.compose([Validators.required])),
      amount: new FormControl('', Validators.compose([Validators.required])),
      cancounter: new FormControl(false, Validators.compose([])),
      status: new FormControl('', Validators.compose([Validators.required])),
      images: new FormControl([], Validators.compose([])),
    });
    this.getOnya();
  }

  ngOnInit(): void {
    this.getGeoLocation('Amritsar')
  }
  getGeoLocation(address: string): Observable<any> {
    console.log('Getting address: ', address);
    let geocoder = new google.maps.Geocode();
    return Observable.create(observer => {
        geocoder.geocode({
            'address': address
        }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                observer.next(results[0].geometry.location);
                observer.complete();
                console.log('success: ', results, ' & Status: ', status);
            } else {
                console.log('Error: ', results, ' & Status: ', status);
                observer.error();
            }
        });
    });
}
  createOnya(data: any) {
    this.accountService.createOnya(data).subscribe({
      next: (result: any) => {
        this.getOnya();
      },
      error: (result: any) => {
      },
      complete: () => { }
    })
  }
  getOnya() {
    this.accountService.getOnya().subscribe({
      next: (result: any) => {
        debugger
        this._onyaList = result.body.data;
      },
      error: (result: any) => {
      },
      complete: () => { }
    })
  }
  onUpload(event: any) {

    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}

      for (let index = 0; index < data.length; index++) {
        const element = data[index];

        // element['images'] = []
        // element['pickupdate'] = new Date();
        // element['MatchDate'] = this.dateService.fulldateFormatter(this.liveMatchForm.value.date) + "," + this.dateService.fullTimeFormatter(this.liveMatchForm.value.date)

      }
      this.createOnya(data)

    };
  }
  clearFile() {

  }
  createOnyy() {
    this.showDialog = true;
  }
  submit() {

    this._createOnyaForm

    debugger
    const dd = {
      "userid": 1,
      "packagesize": this._createOnyaForm.controls['packagesize'].value,
      "packageweight": parseFloat(this._createOnyaForm.controls['packageweight'].value),
      "packagetype": this._createOnyaForm.controls['packagetype'].value,
      "comments": this._createOnyaForm.controls['comments'].value,
      "pickupdate": this._createOnyaForm.controls['pickupdate'].value,
      "pickuplat": 1212,
      "pickuplong": 121,
      "pickupaddress": this._createOnyaForm.controls['pickupaddress'].value,
      "droplat": 12,
      "droplong": 121,
      "dropaddress": this._createOnyaForm.controls['dropaddress'].value,
      "pickuppoint": this._createOnyaForm.controls['pickuppoint'].value,
      "droppoint": this._createOnyaForm.controls['droppoint'].value,
      "pickupslot": this._createOnyaForm.controls['pickupslot'].value,
      "dropslot": this._createOnyaForm.controls['dropslot'].value,
      "receivername": this._createOnyaForm.controls['receivername'].value,
      "receiveremail": this._createOnyaForm.controls['receiveremail'].value,
      "receiverphone": JSON.stringify(this._createOnyaForm.controls['receiverphone'].value),
      "amount": this._createOnyaForm.controls['amount'].value,
      "cancounter": false,
      "status": 11,
      "images": []
    }
    if (this._createOnyaForm.valid) {
      this.accountService.createOnya([dd]).subscribe({
        next: (result: any) => {
          window.location.reload();
          // this.getOnya();
        },
        error: (result: any) => {
        },
        complete: () => { }
      })

    }
  }
  getMapDetail(request: any) {
    debugger
  }
}
