import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-proxymian',
  templateUrl: './menu-proxymian.component.html',
  styleUrls: ['./menu-proxymian.component.css']
})
export class MenuProxymianComponent implements OnInit {

  constructor(private resService:RestaurantService,private router : Router, private route: ActivatedRoute) {
    this.idRestau=localStorage.getItem('restauId');
    this.userId=localStorage.getItem('userId');
    this.retrieveAllMenus();
   }

  idRestau:any;//the key of the desired restaurant 
  userId:any;
  map = new Map();
  menus: any = [];
  
  ngOnInit(): void {
  }
  retrieveAllMenus() {
    let elt:any={};
    let e:any={};
    this.resService.getMenusList(this.idRestau).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(menus => {
      this.menus = menus;
     
  for (elt in this.menus) 
  {
    //console.log( elt)//this.menus[0]['img'][ elt['img']].url)
    for (e in this.menus[elt]['img']) //e=key
    {
      //console.log(this.menus[elt]['img'][e].url) : dish's url 
      //console.log( this.menus[elt]['name']) : dish's name
       this.map.set(this.menus[elt]['name'],this.menus[elt]['img'][e].url);
     }

   }
     
       console.log(this.map);
    }, (error) => {
      console.log(error);
    });           
  }
nbr:number=1;
  orderDish(dishkey:any)
  {
console.log(dishkey)
console.log(this.resService.updateOrderList(this.userId,dishkey,this.idRestau,this.nbr));
  }

  goToOrderValidationPage()
  {
   
    
   this.router.navigate(['validateOrder']);
  }
}
