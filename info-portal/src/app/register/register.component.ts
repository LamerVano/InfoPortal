import { Component, OnInit } from '@angular/core';
import { RegisterBindingModel } from '../models/account/registerBindingModel';
import { Location } from '@angular/common';

import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { User } from '../models/account/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel: RegisterBindingModel;
  currentUser: User;
  isAdmin: boolean;

  constructor(
    private accountService: AccountService,
    private location: Location,
    private router: Router
  ) { }

  isAdminFunc(): void {
    this.accountService.isAdmin().subscribe(res => this.isAdmin = res);
  }

  ngOnInit(): void {
    this.isAdminFunc();
    this.accountService.currentUser.subscribe(user => {
      if (user && !this.isAdmin) {
        this.router.navigate(['/articlies']);
      }
      this.currentUser = user;
    });
    this.registerModel = {Email: '', Login: '', Password: '', ConfirmPassword: ''};
  }

  register(): void {
    this.accountService.register(this.registerModel)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
