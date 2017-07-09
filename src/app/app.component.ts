import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WittyDashboard } from "../pages/dashboard/WittyDashboard";
import { CategoryService } from "./services/category.service";
import { Upload } from "../pages/upload/upload";


@Component({
  selector: 'side-menu-list',
  templateUrl: 'app.html',
  providers: [CategoryService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = WittyDashboard;
  menuList: Array<any>;
  isShowCategory: boolean = false;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private categoryService: CategoryService,
    private events: Events
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.getAllCategoryData();
      //this.nav.setRoot(Upload);
    });
  }

  private getAllCategoryData() {
    this.categoryService.getAllCategoryData().subscribe(response => {
      if (response) {
        this.menuList = response.data;
        this.categoryService.setCategory(this.menuList[0].categoryList);
        this.events.publish("CategoryNotification", this.categoryService.getCategory());
        this.openPage(this.menuList[0]);
      }
    })
  }

  openPage(list?) {
    switch (list.title) {
      case "Upload":
        this.nav.setRoot(Upload);
        this.menu.close();
        break;

      case "Settings":
        this.menu.close();
        break;

      case "Category":
        this.isShowCategory = !this.isShowCategory;

        if (this.isShowCategory) {
          var allCategoryList = this.menuList[0].categoryList;
          for (var i = 0; i < allCategoryList.length; i++) {
            this.menuList.splice(i + 1, 0, allCategoryList[i]);
          }
        }
        else {
          var allCategoryList = this.menuList[0].categoryList;
          for (var i = 0; i < allCategoryList.length; i++) {
            this.menuList.splice(1, 1);
          }
        }
        break;

      default:
        this.menu.close();
        this.nav.setRoot(WittyDashboard);
        break;
    }
  }
}
