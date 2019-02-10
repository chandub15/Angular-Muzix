import { MatFormFieldModule } from '@angular/material/form-field';

import { RouterModule, Routes } from '@angular/router';
import { ModulesModule } from './modules/modules.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModulesModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
