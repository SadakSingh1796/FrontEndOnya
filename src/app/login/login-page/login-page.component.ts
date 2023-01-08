import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'app/Service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  _loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private accountService: AccountService,private route: Router,) {
    this._loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([])),
      password: new FormControl('', Validators.compose([])),

    });
  }

  ngOnInit(): void {
  }
  login() {
    const data = {
      "email": this._loginForm.controls['email'].value,
      "password": this._loginForm.controls['password'].value
    }
    this.accountService.login(data).subscribe({
      next: (result: any) => {
        localStorage.setItem('isBusiness', result.body.data.isBusinessAccount)
        this.route.navigate(['/customer']);
      },
      error: (result: any) => {
      },
      complete: () => { }
    })
  }
}
