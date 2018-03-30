import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AppUser } from './models/app-user';


@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private userService: UserService
   
    ) { }




    canActivate(): Observable <boolean>{
      return this.auth.appUser$
     
      .map(appUser => appUser.isAdmin);
      //appUser is in package model gedefinieerd. cheers
      
    }
}
