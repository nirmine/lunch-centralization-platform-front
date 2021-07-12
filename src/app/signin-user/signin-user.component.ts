import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent implements OnInit {

  constructor(private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  user:any={};
  onSubmitt()
  {
    localStorage.setItem('userId',this.user.id);
    this.router.navigate(['addNewDish']);
    
  }
}
