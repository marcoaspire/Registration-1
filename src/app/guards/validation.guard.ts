import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { RegisterService } from '../User/services/register.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationGuard implements CanActivate, CanLoad {


  constructor(private registerService:RegisterService,
              private router:Router
    ){}

  canActivate(): Observable<boolean> | boolean {
    console.log("canActivate");
    if (localStorage.getItem('id'))
        return true;
    else
        this.router.navigateByUrl('/login');
    return false;
  }
  canLoad(): Observable<boolean> | boolean {
    console.log("canLoad");
    if (localStorage.getItem('id'))
        return true;
    else 
        this.router.navigateByUrl('/login');
    return false;

    
  }
}
