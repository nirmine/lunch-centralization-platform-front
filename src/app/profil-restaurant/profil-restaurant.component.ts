import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profil-restaurant',
  templateUrl: './profil-restaurant.component.html',
  styleUrls: ['./profil-restaurant.component.css']
})
export class ProfilRestaurantComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
