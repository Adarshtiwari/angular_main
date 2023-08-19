import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  getdata: any

  constructor(private ApiService: ApiService) {

  }
  ngOnInit(): void {
    this.ApiService.notificationsubject.subscribe(da => {
      this.getdata = da
    })
  }
  profile() {
    let headres = new HttpHeaders()
      .set("Authorization", 'bearer ' + localStorage.getItem('token'))
    this.ApiService.profile(headres).subscribe(da => {
      console.log(da)
      console.log("output")
      if (da.result == "profile accessed") {
        console.log("output")
        localStorage.setItem("login", "true")
      }
    })
  }
}
