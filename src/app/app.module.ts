import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WittyDashboard } from "../pages/dashboard/WittyDashboard";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HTTPService } from "./common/services/http.service";
import { HttpModule, JsonpModule } from '@angular/http';
import { XHRBackend, RequestOptions } from "@angular/http";
import { CustomCardComponent } from "../pages/card/custom-card";
import { IonicImageLoader } from 'ionic-image-loader';
import { Upload } from "../pages/upload/upload";


@NgModule({
  declarations: [
    MyApp,
    WittyDashboard,
    CustomCardComponent,
    Upload
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WittyDashboard,
    CustomCardComponent,
    Upload
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
