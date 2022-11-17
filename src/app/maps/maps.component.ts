import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/Service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare const google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  _onyaList: any = [];
  constructor(private spinnerService: NgxSpinnerService, private accountService: AccountService,) {
    this.getOnya();
  }

  ngOnInit() {




    // var marker = new google.maps.Marker({
    //   position: myLatlng,
    //   title: "Current Location",
    //   icon: "/assets/img/mapicon.png",
    // });
    // var marker1 = new google.maps.Marker({
    //   position: myLatlng1,
    //   title: "Current Location",
    //   icon: "/assets/img/mapicon.png",
    // });

    // To add the marker to the map, call setMap();
    // marker.setMap(map);
    // marker1.setMap(map);
  }
  getOnya() {
    this.spinnerService.show();
    this.accountService.getOnya().subscribe({
      next: (result: any) => {

        this._onyaList = result.body.data;
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
  googleMap() {
    // var myLatlng = new google.maps.LatLng(30.743731, 76.643902);
    // var myLatlng1 = new google.maps.LatLng(30.7514252, 76.7579126);
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(30.743731, 76.643902),
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
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    for (let i = 0; i < this._onyaList.length; i++) {
      console.log(this._onyaList)
      var myLatlng1 = new google.maps.LatLng(this._onyaList[i].pickuplat, this._onyaList[i].pickuplong);
      var marker1 = new google.maps.Marker({
        position: myLatlng1,
        title: "Current Location",
        icon: "/assets/img/ic_onya_marker.png",
      });
      var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<div id="bodyContent">' +
        "<p><b>$</b>" + this._onyaList[i].amount +
        '<p>' +"</div>" +
        "</div>"
        + new Date();
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: "",
      });
      marker1.addListener("click", () => {
        infowindow.open({
          anchor: marker1,
          map,
        });
      });
      marker1.setMap(map);
    }
  }
}
