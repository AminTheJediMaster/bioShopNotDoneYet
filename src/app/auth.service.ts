import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';
import 'rxjs/add/observable/of'

@Injectable()
export class AuthService {
user$: Observable <firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {

     this.user$ = afAuth.authState;
  }

login() {
  let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  localStorage.setItem('returnUrl', returnUrl);
  this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

}

logout(){

  this.afAuth.auth.signOut();

}

get appUser$():Observable<AppUser>{
  return this.user$
  .switchMap(user => {
   // this.userService.getUser(user.uid)
    if (user) return this.userService.getUser(user.uid)

    return Observable.of(null);

  });



}

}
