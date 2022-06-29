import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class DateserviceService {

  constructor(private http:HttpClient) { }
url="https://localhost:44311/api/"
  GetUsers()
  {
    return this.http.get<User[]>(`${this.url}Dating/getUsers`);
  }

  // SaveUser(user:User)
  // {
  //   return this.http.post(`${this.url}Acount/register`,user);
  // }
}
