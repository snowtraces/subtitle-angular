import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.randomImage(1);
  }
  randomImage(max: number): void {
    const idx = Math.floor(Math.random() * Math.floor(max)) + 1;
    // @ts-ignore
    document.querySelector('app-search-bar').style.background
      = '#eee url(\'/assets/images/0' + idx + '.jpg\') center fixed';
  }

}
