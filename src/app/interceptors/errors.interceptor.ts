import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private ruoter:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
        if(error)
        {
          switch(error.status)
          {
            case 400 :
              if(error.error.errors)
              {
                const modalStateError=[];
                for( const key in error.error.errors)
                {
                  if(error.error.errors[key])
                  {
                    modalStateError.push(error.error.errors[key]);
                  }
                }
                throw modalStateError.flat();
              }
              else
              {
                Swal.fire({
                  icon: 'error',
                  title: error.status,
                  text: error.statusText,
                  
                })
              }
              break;
              case 401:
                Swal.fire({
                  icon: 'error',
                  title: error.status,
                  text: error.statusText,
                  
                })
                break;

                case 404:
               this.ruoter.navigateByUrl("/not-found");
                break;
                case 500:
               const navegationExtras:NavigationExtras={state: {error: error.error}}
               this.ruoter.navigateByUrl('/server-error',navegationExtras);
                break;
              default: 
              Swal.fire({
                icon: 'error',
                title: 'Error inesperado',
                text: 'Algo anda mal',
                
              });
              console.log(error);
              break;
          }
        }
        return  throwError(error);
      })

    );
  }
}
