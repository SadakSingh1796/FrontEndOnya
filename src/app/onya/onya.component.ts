import { Component, Input, OnInit } from '@angular/core';
// import { AccountService } from 'app/Service/api.service';
import * as XLSX from 'xlsx';
import { AccountService } from '../Service/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
declare const google: any;
import * as FileSaver from 'file-saver';
const TEMPLATE = "assets/file/onya_export_1669381714509.xlsx";
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
  _onyaListCopy: any = [];
  showDialog: boolean = false;
  location: Observable<any>;
  closePopUp() {

  }
  name = 'Angular 5';
  lat: any;
  lng: any;
  map: any;
  locationS = 'Amritsar'
  _isGoogleMap: boolean = false;
  _currentMarkerName: any = '';
  _mapOptions: any;
  _customerColoumns: any = [

  ];
  cols: any = [];
  
  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private route: Router,
    private spinnerService: NgxSpinnerService) {
    this.getMapDetail('asfasd')

    this._createOnyaForm = this.formBuilder.group({
      userid: new FormControl(0, Validators.compose([])),
      packagesize: new FormControl('', Validators.compose([])),
      packageweight: new FormControl('', Validators.compose([])),
      packagetype: new FormControl('', Validators.compose([])),
      comments: new FormControl('', Validators.compose([])),
      pickupdate: new FormControl('', Validators.compose([])),
      pickuplat: new FormControl('', Validators.compose([])),
      pickuplong: new FormControl('', Validators.compose([])),
      pickupaddress: new FormControl('', Validators.compose([])),
      droplat: new FormControl('', Validators.compose([])),
      droplong: new FormControl('', Validators.compose([])),
      dropaddress: new FormControl('', Validators.compose([])),
      pickuppoint: new FormControl('', Validators.compose([])),
      droppoint: new FormControl('', Validators.compose([])),
      pickupslot: new FormControl('', Validators.compose([])),
      dropslot: new FormControl('', Validators.compose([])),
      receivername: new FormControl('', Validators.compose([])),
      receiveremail: new FormControl('', Validators.compose([])),
      receiverphone: new FormControl('', Validators.compose([])),
      amount: new FormControl('', Validators.compose([])),
      cancounter: new FormControl(false, Validators.compose([])),
      status: new FormControl('', Validators.compose([])),
      images: new FormControl([], Validators.compose([])),
    });
    this.getOnya();
  }

  ngOnInit(): void {
  }
  createOnya(data: any) {
    this.spinnerService.show();
    this.accountService.createOnya(data).subscribe({
      next: (result: any) => {
        this.getOnya();
        this.spinnerService.hide();
      },
      error: (result: any) => {
        this.spinnerService.hide();
      },
      complete: () => { }
    })
  }
  getOnya() {
    this.spinnerService.show();
    this.accountService.getOnya().subscribe({
      next: (result: any) => {

        this._onyaList = result.body.data;
        this.cols = [
          { field: 'packagesize', header: 'Package Size' },
          { field: 'packagetype', header: 'Package Type' },
          { field: 'comments', header: 'Comments' },
          { field: 'pickupdate', header: 'Pickup Date' },
          { field: 'dropaddress', header: 'Drop Address' },
          { field: 'pickuppoint', header: 'Pickup Point' },
          { field: 'droppoint', header: 'Drop Point' },
          { field: 'pickupslot', header: 'Pickup Slot' },
          { field: 'receivername', header: 'Receiver Name' },
          { field: 'receiveremail', header: 'Receiver Email' },
          { field: 'receiverphone', header: 'Receiver Phone' },
          { field: 'amount', header: 'Amount' },
        ]
        this._customerColoumns = this.cols
        console.log(this._onyaList);
        this.spinnerService.hide();
        this.googleMap()
      },
      error: (result: any) => {
        this.spinnerService.hide();
      },
      complete: () => { }
    })
  }
  onUpload(event: any) {

    /* wire up file reader */
    this.spinnerService.show();
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
      this.spinnerService.hide();
      this.createOnya(data)

    };
  }
  clearFile() {

  }
  createOnyy() {
    this.showDialog = true;
  }
  @Input() get selectedColumns(): any[] {
    return this._customerColoumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._customerColoumns = this.cols.filter(col => val.includes(col));
  }
  submit() {

    this._createOnyaForm


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
    if (true) {
      this.spinnerService.show();
      this.accountService.createOnya([dd]).subscribe({
        next: (result: any) => {
          this.spinnerService.hide();
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
    navigator.geolocation
    navigator.geolocation.watchPosition((request) => {
      this.ShowLocation(request, this.map);
    });
  }

  private ShowLocation(position: any, map: any): void {
    this.lng = +position.coords.longitude;
    this.lat = +position.coords.latitude;
    this._mapOptions.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    console.log('Latitude Sadak' + position.coords.latitude + "longitude -" + position.coords.longitude);
  }

  pickUpaddress() {
    this.accountService.getLocation(this._createOnyaForm.controls['pickupaddress'].value).subscribe({
      next: (result: any) => {
        // this.getOnya();
      },
      error: (result: any) => {
      },
      complete: () => { }
    })

  }
  handleChange(data: any) {


    if (!this._isGoogleMap) {
      this.googleMap()
    }

  }
  
  downloadTemplate() {
    const link = document.createElement('a');
    link.setAttribute('target', '_self');

    link.setAttribute('href', TEMPLATE);
    link.setAttribute('download', `add_onya_template.xlsx`);

    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  googleMap() {
    this._onyaListCopy = [{
      "pickuplat": 30.7514252,
      "pickuplong": 76.7579126
    },
    {
      "pickuplat": 30.7631255,
      "pickuplong": 76.67798049999999
    }
      , {
      "pickuplat": 30.800142,
      "pickuplong": 76.8362439
    }
      , {
      "pickuplat": 30.9881116,
      "pickuplong": 76.5505886
    }]
    this._mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(30.9881116, 76.5505886),
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]

    };
    var map = new google.maps.Map(document.getElementById("map"), this._mapOptions);
    for (let i = 0; i < this._onyaListCopy.length; i++) {

      this._currentMarkerName = this.generateAlpha(5)
      console.log('markergenerete' + this._currentMarkerName);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this._onyaListCopy[i].pickuplat, this._onyaListCopy[i].pickuplong),
        title: "Hello World!",
        icon: "/assets/img/ic_onya_marker.png",
      });
      marker.setMap(map);
    }
    // this._isGoogleMap = !this._isGoogleMap;
    // var myLatlng = new google.maps.LatLng(30.743731, 76.643902);
    // var myLatlng1 = new google.maps.LatLng(30.7514252, 76.7579126);
    // var mapOptions = {
    //   zoom: 13,
    //   center: myLatlng,
    //   scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
    //   styles: [
    //     {
    //       "elementType": "geometry",
    //       "stylers": [
    //         {
    //           "color": "#f5f5f5"
    //         }
    //       ]
    //     },
    //     {
    //       "elementType": "labels.icon",
    //       "stylers": [
    //         {
    //           "visibility": "off"
    //         }
    //       ]
    //     },
    //     {
    //       "elementType": "labels.text.fill",
    //       "stylers": [
    //         {
    //           "color": "#616161"
    //         }
    //       ]
    //     },
    //     {
    //       "elementType": "labels.text.stroke",
    //       "stylers": [
    //         {
    //           "color": "#f5f5f5"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "administrative.land_parcel",
    //       "elementType": "labels.text.fill",
    //       "stylers": [
    //         {
    //           "color": "#bdbdbd"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "poi",
    //       "elementType": "geometry",
    //       "stylers": [
    //         {
    //           "color": "#eeeeee"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "poi",
    //       "elementType": "labels.text.fill",
    //       "stylers": [
    //         {
    //           "color": "#757575"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "poi.park",
    //       "elementType": "geometry",
    //       "stylers": [
    //         {
    //           "color": "#e5e5e5"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "poi.park",
    //       "elementType": "labels.text.fill",
    //       "stylers": [
    //         {
    //           "color": "#9e9e9e"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "road",
    //       "elementType": "geometry",
    //       "stylers": [
    //         {
    //           "color": "#ffffff"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "road.arterial",
    //       "elementType": "labels.text.fill",
    //       "stylers": [
    //         {
    //           "color": "#757575"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "road.highway",
    //       "elementType": "geometry",
    //       "stylers": [
    //         {
    //           "color": "#dadada"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "road.highway",
    //       "elementType": "labels.text.fill",
    //       "stylers": [
    //         {
    //           "color": "#616161"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "road.local",
    //       "elementType": "labels.text.fill",
    //       "stylers": [
    //         {
    //           "color": "#9e9e9e"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "transit.line",
    //       "elementType": "geometry",
    //       "stylers": [
    //         {
    //           "color": "#e5e5e5"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "transit.station",
    //       "elementType": "geometry",
    //       "stylers": [
    //         {
    //           "color": "#eeeeee"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "water",
    //       "elementType": "geometry",
    //       "stylers": [
    //         {
    //           "color": "#c9c9c9"
    //         }
    //       ]
    //     },
    //     {
    //       "featureType": "water",
    //       "elementType": "labels.text.fill",
    //       "stylers": [
    //         {
    //           "color": "#9e9e9e"
    //         }
    //       ]
    //     }
    //   ]

    // };
    // var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // var marker = new google.maps.Marker({
    //   position: myLatlng,
    //   title: "Hello World!",
    //   icon: "/assets/img/mapicon.png",
    // });
    // var marker1 = new google.maps.Marker({
    //   position: myLatlng1,
    //   title: "Hello World!",
    //   icon: "/assets/img/mapicon.png",
    // });

    // // To add the marker to the map, call setMap();

    // marker.setMap(map);
    // marker1.setMap(map);
  }
  generateAlpha(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this._onyaList);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "onya");
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

