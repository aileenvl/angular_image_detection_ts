import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ObjectDetectionComponent } from './app.component';

@NgModule({
  declarations: [
    ObjectDetectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ObjectDetectionComponent]
})
export class AppModule { }
