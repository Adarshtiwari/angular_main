import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public notificationsubject = new Subject<any>()

  notification(data: any) {
    this.notificationsubject.next(data)
  }

  postProduct(data: any) {
    return this.http.post<any>("http://localhost:3000/productList/", data);
  }
  getProduct() {
    return this.http.get<any>("http://localhost:3000/productList/");
  }
  patchProduct(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/productList/" + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>("http://localhost:3000/productList/" + id)
  }

  login(data: any) {
    return this.http.post<any>("http://localhost:8001/login", data)
  }

  profile(headers: any) {
    return this.http.post<any>("http://localhost:8001/profil", {}, { headers })
  }


}
