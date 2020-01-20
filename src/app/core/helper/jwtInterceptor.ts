import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';
import {AuthService} from '../services/auth.service';

@Injectable()
export class JwtInterceptor {
  jwtHelper = new JwtHelper();
  role;
  constructor(private authService: AuthService) {}

  

  /* public getRole() {
    return this.role;
  } */
}
