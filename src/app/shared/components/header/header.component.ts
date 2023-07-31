import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = "Rick and Morty App";
  rickImg = "../../../../assets/ricksanchez.png";

  constructor() { }

  ngOnInit(): void {
  }

}
