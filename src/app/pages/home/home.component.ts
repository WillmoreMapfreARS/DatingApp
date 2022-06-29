import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { DateserviceService } from 'src/app/services/dateservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    registerMode= false;
   
    
    
  constructor() { }

  ngOnInit(): void {
  
  }

  registerToggle()
  {
    this.registerMode= !this.registerMode;
  }
  
  cancelRegisterMode(event:boolean)
  {
    this.registerMode=event;
  }
}
