import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-validate-order-proxymian',
  templateUrl: './validate-order-proxymian.component.html',
  styleUrls: ['./validate-order-proxymian.component.css']
})
export class ValidateOrderProxymianComponent implements OnInit {
  idRestau:any;//the key of the desired restaurant 
  userId:any;

  constructor(private resService:RestaurantService,private router : Router, private route: ActivatedRoute) {
    this.idRestau=localStorage.getItem('restauId');
    this.userId=localStorage.getItem('userId');

    



   // this.total="0";
  //console.log(this.idRestau)
   this.resService.getOrdersByIdRestau(this.idRestau).snapshotChanges().subscribe(order => {
 
    let e;
    let ens:any={};
    let el:any={};
    let elt:any;
    let x;
    /*let s={};
    s["somme"]=0;
    this.orderList.push(s);*/
    
 // console.log(this.idRestau)
    for(e in order)
    {
      if(order[e].key==this.userId)
      {
   
        elt=order[e].payload.val();
        for(x in  elt)
        {
          if(x!="status" && x!="note" && x!="total")
          {
          el={};
          el.name=x;//dish's name
         this.resService.getImageSrc(this.idRestau,x,el)
          el.nbr=elt[x]//how many times this dish is ordered by this user
          this.getDishInfo(x,el);
         
         // this.total=this.total+parseInt(el.price)*parseInt(el.nbr)
          this.orderList.push(el)
          //console.log(this.orderList)
        }
        else
        {
          if( x=="note")
          this.note=elt[x]
        }
        }
      }
      console.log(this.orderList)
    }  
  }, (error) => {
    console.log(error);
  });
  

 
  

   }

   getDishInfo(idDish:any,ens:any):any
   {
    this.resService.getDishInfoById(this.idRestau,idDish).snapshotChanges().subscribe(dish => {
     // console.log(dish)
      let e;
      let d:any;
      for(e in dish)
      {
        
          d={};
          d=dish[e].payload.val();
          if(d.name==idDish)
        {
        // console.log(d)
        ens.composition=d.composition
       
         ens.price=d.price;
        ens.type=d.type;
       
        this.total=this.total+parseInt(ens.price)*parseInt(ens.nbr)
      }
       //console.log(el)
      }
      //console.log(d)
    
       }, (error) => {
         console.log(error);
       });
   }
   orderList:any=[];
  
  ngOnInit(): void {
  }
  addItem(idDish:any)
  {
    //console.log(idDish)
    let x;
    for(x in this.orderList)
      //console.log(this.orderList[x].name)  
      if(this.orderList[x].name==idDish)
      {
        //console.log(this.orderList[x].nbr)
        this.orderList[x].nbr=this.orderList[x].nbr+1;
        this.total=this.total+parseInt(this.orderList[x].price)
        //this.resService.updateDishNumber(this.idRestau,this.userId,idDish,this.orderList[x].nbr);
        //console.log(this.userId)
      }
      
        
  }
  removeItem(idDish:any)
  {
    //console.log(idDish)
    let x;
    for(x in this.orderList)
      //console.log(this.orderList[x].name)  
      if(this.orderList[x].name==idDish)
      {
        //console.log(this.orderList[x].nbr)
        this.orderList[x].nbr=this.orderList[x].nbr-1;
        //this.resService.updateDishNumber(this.idRestau,this.userId,idDish,this.orderList[x].nbr);
        this.total=this.total-parseInt(this.orderList[x].price)
      }
      
        
  }
  total:number=0;
  note:any="";
  confirmOrder()
  {
    let x;
    for(x in this.orderList)
    {
      this.resService.updateDishNumber(this.idRestau,this.userId,this.orderList[x].name,this.orderList[x].nbr,this.note,this.total);
    }
  
this.router.navigate(['dashboard'])
  }
  deleteOrderedDish(idDish:any)
  {
    let x;
    for(x in this.orderList)
    {
      if(this.orderList[x].name==idDish)
      {
       
        
        this.resService.deleteOrderedDish(this.idRestau,this.userId,idDish)
        console.log( this.orderList)
        this.orderList.splice(x,1);
        console.log( this.orderList)
        
      }
      if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') === 'true') {
        localStorage.setItem('firstReload', 'false');
        window.location.reload();
      } else {
        localStorage.setItem('firstReload', 'true');
      }
  
     //this.orderList
    }
  
  }

  map = new Map();
}
