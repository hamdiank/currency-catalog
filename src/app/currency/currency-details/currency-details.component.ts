import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { CurrencyService } from '../../shared/services/currency.service';
import { CurrencyModel } from '../../shared/model/currency.model';
import { Location }                 from '@angular/common';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {
currency:CurrencyModel;
  constructor(private route: ActivatedRoute, private location: Location, private currencyServices:CurrencyService) { }

  ngOnInit() {
    // get currency id from route 
    this.route.paramMap.switchMap((params: ParamMap) => this.currencyServices.getCurrencyById(params.get('id')))
      .subscribe(currency => this.currency = currency);
  }
  /** back to previous route
   */
  returnBack(){
    this.location.back();
  }
}
