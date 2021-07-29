import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { 
    //console.log("heyo")
    if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') === 'true') {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }
  }

  ngOnInit(): void {
    //console.log("hi")
  }

}
