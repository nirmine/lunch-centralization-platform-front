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
      this.orderList=[]
      //console.log(order) :all orders of this restau + delivery+orderStatus
      let e;
      let ens:any={};
      let el:any={};
      let elt:any;
      let x;
    let note;
    
   // console.log(this.restauId)
      for(e in order)
      {
      

          elt=order[e].payload.val();
          //console.log(elt)//=delivery/status/{..}
         if(order[e].key!="delivery" && order[e].key!="status")
         {
           note=""
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
          else
          {
            
            if(x=="note")
            {
              console.log(elt[x])
              note=elt[x]
            }
          }
          el.note=note
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
  
  editOrderOfClient(idClient:any)
  {
    sessionStorage.setItem('restauId',this.restauId);
    sessionStorage.setItem('clientId',idClient);
    sessionStorage.setItem('role',"restau");
    this.router.navigate(['validateOrder']);
  }
}
