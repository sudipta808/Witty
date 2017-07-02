import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WittyDashboard } from "../pages/dashboard/WittyDashboard";
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HTTPService } from "./common/services/http.service";
import { HttpModule, JsonpModule } from '@angular/http';
import { XHRBackend, RequestOptions } from "@angular/http";


@NgModule({
  declarations: [
    MyApp,
    WittyDashboard,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WittyDashboard,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HTTPService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        localStorage.setItem('is_local', JSON.stringify(false));
        return new HTTPService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class AppModule {}
