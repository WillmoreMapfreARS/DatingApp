import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl="https://localhost:44311/api/";
  constructor(private http:HttpClient) { }
validationErros:string[]=[];
  print(value:any)
  {
    console.log(value);
  }
  ngOnInit(): void {
  }
  
  get404Error()
  {
    this.http.get(`${this.baseUrl}buggy/not-found`).subscribe(res=>{
      
      this.print(res);
    },error=>{
      this.print(error);
    }
    );
  }
  get400Error()
  {
    this.http.get(`${this.baseUrl}buggy/bad-request`).subscribe(res=>{
      
      this.print(res);
    },error=>{
      this.print(error);
    }
    );
  } get500Error()
  {
    this.http.get(`${this.baseUrl}buggy/server-error`).subscribe(res=>{
      
      this.print(res);
    },error=>{
      this.print(error);
    }
    );
  } get401Error()
  {
    this.http.get(`${this.baseUrl}buggy/auth`).subscribe(res=>{
      
      this.print(res);
    },error=>{
      this.print(error);
      
    }
    );
  } get400ValidationError()
  {
    this.http.post(`${this.baseUrl}Acount/register`,{}).subscribe(res=>{
      
      this.print(res);
    },error=>{
      this.print(error);
      this.validationErros=error;
    }
    
    );
  }

}
