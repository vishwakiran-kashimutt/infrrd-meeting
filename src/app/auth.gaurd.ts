import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    user: any;
  constructor( private router: Router, private loginService: LoginService) { }
    

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
    const expectedRole = next.data['expectedRole'];
    const validuser = localStorage.getItem('roles');
    if (expectedRole === validuser) {
      return true;
    } else {
      this.router.navigate(['/error']);
      return false;
    }
  }
}
