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
  _isSubmit: boolean = false;
  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private route: Router,) {
    this._loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([])),
      password: new FormControl('', Validators.compose([])),

    });
  }

  ngOnInit(): void {
  }
  login() {
    this._isSubmit = true;
    const data = {
      "email": this._loginForm.controls['email'].value,
      "password": this._loginForm.controls['password'].value
    }
    this.accountService.login(data).subscribe({
      next: (result: any) => {
        if (result.body.isSuccess) {
          localStorage.setItem('isBusiness', result.body.data.isBusinessAccount)
          this.route.navigate(['/onya']);
        }else{
          alert('Wrong Email And Password')
        }
       
      },
      error: (result: any) => {
      },
      complete: () => { }
    })
  }
}
