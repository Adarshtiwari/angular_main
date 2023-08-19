import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountsService {

  constructor() { }

  gecount() {
    return ["a", "b", "c"]
  }
}
