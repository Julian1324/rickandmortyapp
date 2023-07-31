import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  lupaPng = "../../../../assets/lupa.png";
  type: string = 'name';
  value: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onChangeSelect(value: string) {
    // console.log(value);
    this.type = value;
    this.onSearch(this.value);
  }

  onSearch(value: string) {
    
    if (!!value && value.length > 2) {
      this.value = value;
      this.router.navigate(['/character-list'], { queryParams: { type: this.type, q: value } })
    } else {
      this.router.navigate(['/home'])
    }
  }

}
