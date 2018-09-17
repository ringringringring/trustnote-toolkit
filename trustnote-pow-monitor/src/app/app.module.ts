import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [ { provide: NZ_I18N, useValue: en_US } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
