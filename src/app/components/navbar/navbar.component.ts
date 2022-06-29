import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../../models/User';
import { DatingAppService } from '../../services/dating-app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 model:any={}
 user:User = new User();
 loggedIn=false;
 //CurrentUser$:Observable<User>=new ReplaySubject<User>(1);
  constructor(public sercicio:DatingAppService) { }

  ngOnInit(): void {
    //this.getcurrentUser();
   // this.CurrentUser$=this.sercicio.currentUser$;
  }

  login(){
   
    this.user.password=this.model.password;
    this.user.userName=this.model.username;
    this.sercicio.login(this.user).subscribe(reslt=>{
      console.log(reslt);
      //this.loggedIn=true;
      localStorage.setItem("user",JSON.stringify(reslt));
      this.sercicio.currentUserSource.next(reslt);
    },error=>{
       console.error(error);
    }   
    );
  }

 logout()
 {
  this.sercicio.logout();
 // this.loggedIn=false;
 }
  // getcurrentUser()
  // {
  //   this.sercicio.currentUser$.subscribe(user=>{
  //   this.loggedIn =!!user;
  //   },error=>{
  //     console.log(error)
  //   })
  // }

}
