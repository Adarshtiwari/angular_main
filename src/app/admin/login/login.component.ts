import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userform !: FormGroup

  constructor(private api: ApiService, private FormBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.userform = this.FormBuilder.group({
      Username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  sendNotification(data: any) {
    console.log(data)
    this.api.notification(data)
  }

  login() {
    this.api.login(this.userform.value).subscribe(data => {
      localStorage.setItem("token", data.token)
      console.log(data.token)
    })
  }


}
