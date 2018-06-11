import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyListComponent } from './currency/currency-list/currency-list.component';
import { CurrencyDetailsComponent } from './currency/currency-details/currency-details.component';
import { CurrencyService } from './shared/services/currency.service';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule,MatSelectModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CurrencyListComponent},
  { path: 'currency/:id', component: CurrencyDetailsComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    CurrencyListComponent,
    CurrencyDetailsComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSelectModule,
    MatInputModule,
    PaginationModule.forRoot()
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
