import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private readonly httpClient: HttpClient) { }
  getUsers() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
    return this.httpClient.get("http://34.193.73.75:5000/api/Admin/GetAllUsers",
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {

        },
        observe: 'response',
      }
    ).pipe(

    );
  }
  updateStatus(data: any) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
    return this.httpClient.post("http://34.193.73.75:5000/api/Admin/UpdateUserStatus", data,
      {
        headers: reqHeader,
        params: {

        },
        observe: 'response',
      }
    ).pipe(

    );
  }
  getUserDocument(userId: any) {
    return this.httpClient.get("http://34.193.73.75:5000/api/Admin/GetUserDocuments?userid=" + userId,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {

        },
        observe: 'response',
      }
    ).pipe(
    );
  }
  getOnya() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
    return this.httpClient.get("http://34.193.73.75:5000/api/Admin/GetAllOnyas",
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {

        },
        observe: 'response',
      }
    ).pipe(
    );
  }
  createOnya(data: any) {

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })

    return this.httpClient.post("http://34.193.73.75:5000/api/Admin/CreateOnyas", data,
      {
        headers: reqHeader,
        params: {

        },
        observe: 'response',
      }
    ).pipe(
    );
  }
  getLocation(data:any) {
    return this.httpClient.get("https://maps.googleapis.com/maps/api/geocode/json?address="+data+"&key=AIzaSyAeao06OKyyoWwqn457y2ZIhxosQvwuwC0",
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {

        },
        observe: 'response',
      }
    ).pipe(
    );
  }
}
