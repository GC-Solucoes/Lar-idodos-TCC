import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {LoginComponent} from '../admin/login/login.component';
import { LoginService } from './login/login.service';
import {User} from '../admin/login/User/user';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private userSubject: BehaviorSubject<User>;


  constructor(
    private route: ActivatedRoute,
    private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    // this.userSubject.next(JSON.parse('null'));
    this.router.navigate(['/']) ;

  }

}
