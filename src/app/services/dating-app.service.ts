import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatingAppService {

  url='https://localhost:44311/api/'

  public currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http:HttpClient) { }
  login(user:User)
  {
    return this.http.post<User>(`${this.url}Acount/Login`,user);
    // .pipe(
    //   map((response:any)=>{
    //     const user=response
    //     if(user){
    //       localStorage.setItem("user",JSON.stringify(user));
    //       this.currentUserSource.next(user);
    //     }
    //   })
    // )
  }

  setCurrentUser(user:User)
  {
     this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem("user");
    this.currentUserSource.next(new User());
  }

  SaveUser(user:User)
  {
    return this.http.post(`${this.url}Acount/register`,user).pipe(
      map( (u:any)=>{
        if(u)
        {
          localStorage.setItem("user",JSON.stringify(u));
          this.currentUserSource.next(u)
        }
        return u;
      })
    );
  }
}
