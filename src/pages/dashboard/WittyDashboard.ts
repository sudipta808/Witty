import { Component } from '@angular/core';
import { Events } from "ionic-angular";
import { CategoryService } from "../../app/services/category.service";

@Component({
  selector: 'witty-dashboard',
  templateUrl: 'witty-dashboard.html'
})
export class WittyDashboard {
  private categoryList: any[];
  private selectedCategory: any;
  private isCategoryUpdated: boolean = false;
  constructor(private categoryService: CategoryService,
              private events: Events) {

  }

  ionViewWillEnter() {
    this.categoryList = this.categoryService.getCategory();
    if(this.categoryList.length != 0)
      this.isCategoryUpdated = false;
    this.events.subscribe("CategoryNotification", notifyData => {
      if(notifyData) {
        this.categoryList = notifyData;
        this.selectedCategory = 1;
        this.isCategoryUpdated = false;
      }
    })
  }
}
