import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CategoryService } from '../services/category.service';
import { AccountService } from '../services/account.service';
import { User } from '../models/account/user';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  category: Category;
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location,
    private accountService: AccountService,
    private router: Router
  ) { }

  getCurrentUser(): void {
    this.accountService.currentUser.subscribe(user => {
      if (!user) {
        this.router.navigate(['/categories']);
      }
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getCategory();
  }

  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory(id)
      .subscribe(category => this.category = category);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.categoryService.updateCategory(this.category)
      .subscribe(() => this.goBack());
  }

  delete(category: Category): void {
    this.categoryService.deleteCategory(category).subscribe(() => this.goBack());
  }
}
