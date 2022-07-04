import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DatingAppService } from '../services/dating-app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private servicio:DatingAppService)
  {

  }
  canActivate(): Observable<boolean> {
    return this.servicio.currentUser$.pipe<boolean>(
      map<any,boolean>((user:any)=>{

        if(user) return true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "no autorizado",
          
        })
        return false;

      })
    );
  }
  
}
