import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import { AppComponent } from './app.component';
import { MatTableModule, MatToolbarModule, MatCardModule, MatGridListModule } from '@angular/material';
import { ScoresService } from './scores.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    HttpModule
  ],
  providers: [ScoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
