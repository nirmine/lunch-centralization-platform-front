import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-dashboard-restau',
  templateUrl: './dashboard-restau.component.html',
  styleUrls: ['./dashboard-restau.component.css']
})
export class DashboardRestauComponent implements OnInit {
  restauId:any;
  orderList=[]
  orderListTest=[]
  orderStatus:any;
  delivery:any;
  constructor(private restauService:RestaurantService,private router : Router, private route: ActivatedRoute)
   {
    if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') === 'true') {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }

      this.restauId=sessionStorage.getItem('userId');
      
    this.restauService.getOrdersByIdRestau(this.restauId).snapshotChanges().subscribe(order => {
 
      //console.log(order) :all orders of this restau + delivery+orderStatus
      let e;
      let ens:any={};
      let el:any={};
      let elt:any;
      let x;
    
    
   // console.log(this.restauId)
      for(e in order)
      {
      

          elt=order[e].payload.val();
          //console.log(elt)//=delivery/status/{..}
         if(order[e].key!="delivery" && order[e].key!="status")
         {
          //console.log(order[e].key)//client id
          for(x in  elt)
          { 
            
            if(x!="status" && x!="note" && x!="total")//dish name
            {
           //   console.log(x)
            el={};
            el.name=x;//dish's name
              el.client=order[e].key
            el.nbr=elt[x]//how many times this dish is ordered by this user
           
           this.restauService.getInfoUser(order[e].key,el)
          this.restauService.getInfosDish(this.restauId,x).snapshotChanges().subscribe(infos => {
           //  console.log(infos[0].payload.val())
             // console.log(infos[0].payload.val()['price'])
             //console.log(infos)
             el['price']=infos[0].payload.val()['price']
              
              }, (error) => {
                console.log(error);
              });
           
            
              this.orderList.push(el)
            
           // console.log(ee)
          }
          }
        }
        else
        {
          if(order[e].key=="status")
          this.orderStatus=elt
          else
          this.delivery=elt;

        }
        console.log(this.orderList)
        
      } 
      //console.log(this.orderStatus)
    }, (error) => {
      console.log(error);
    });
    
  

    }

  ngOnInit(): void {
  }

 /* getInfosDish(x:any,el:any)
  { 
    //console.log(el)
    this.restauService.getInfosDish(this.restauId,x).snapshotChanges().subscribe(infos => {
   // console.log(infos[0].payload.val()['price'])
  
    el["Dishprice"]=infos[0].payload.val()['price']
    
     }, (error) => {
       console.log(error);
     });
    }*/
  setOrderStatus(status:any)
  {
    this.restauService.updateOrderStatus(this.restauId,status)
    this.orderList.forEach(element => {
      console.log(element.name)
    });
  }
  
}
