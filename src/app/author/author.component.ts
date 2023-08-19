import { Component } from '@angular/core';
import { CountsService } from '../counts.service';

@Component({
  selector: 'author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {

  data
  email = "adarsh@gmail.com"
  constructor(service: CountsService) {

    this.data = service.gecount();

  }
  onkey() {
    console.log("hello", this.email)
  }

}
