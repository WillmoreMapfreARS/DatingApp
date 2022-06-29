import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { DatingAppService } from '../../services/dating-app.service';
import { DateserviceService } from '../../services/dateservice.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model:any={};
  @Input() usersFromHomeComponent:any;
  @Output() cancelRegister= new EventEmitter();
  print(value:any)
  {
    console.log(value);
  }
  constructor(private sercivio:DatingAppService) { }

  ngOnInit(): void {
  }

  register()
  {
    this.sercivio.SaveUser(this.model).subscribe(resp=>{
      this.print(resp);
          this.cancel();
    },error=>{
      this.print(error);
    });

   
  }
  cancel()
  {
    this.cancelRegister.emit(false);
    
  }
}
