import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-give-feedback-proxymian',
  templateUrl: './give-feedback-proxymian.component.html',
  styleUrls: ['./give-feedback-proxymian.component.css']
})
export class GiveFeedbackProxymianComponent implements OnInit {

  constructor(private restauService:RestaurantService,private router : Router, private route: ActivatedRoute)
   {

this.finishedOrderIdOrder=sessionStorage.getItem('finishedOrderKey')
this.finishedOrderIdRestau=sessionStorage.getItem('finishedOrderIdRestau')
   }
finishedOrderIdRestau:any;
finishedOrderIdOrder   
order:any={};
  ngOnInit(): void {
  }

  onSubmitt()
  {
   console.log(this.finishedOrderIdRestau)
    this.restauService.setFeedbackAboutOrder(this.finishedOrderIdRestau,this.finishedOrderIdOrder,this.order.feed)
  this.router.navigate(['dashboard'])
  }
}
