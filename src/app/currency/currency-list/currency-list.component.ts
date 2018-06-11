import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../shared/services/currency.service';
import { CurrencyModel } from '../../shared/model/currency.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PaginationConfig } from '../../shared/model/paginationConfig.model';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  numberCulumns: number; // number of columns to display
  paginator: PaginationConfig; // pagination config
  currencies: CurrencyModel[]; // currency data model
  filters = ['id', 'code', 'name', 'type']; // search filter options
  itemsPerPageOptions = [10, 20, 100]; // dispaly item options
  selectedOptionFilter: string; // selected filter option
  selectedOptionPagination = this.itemsPerPageOptions[0]; // default pagination number items per page
  searchKeyword: string;
  constructor(private currencyServices: CurrencyService) { }

  ngOnInit() {
    // get number columns to display from screen size
    this.numberCulumns = this.displaycolumns(window.innerWidth);
    this.loadCurrencyList(0, 10, this.searchKeyword, this.selectedOptionFilter);
  }
  /**    load currencies list
   * @param  {number} sizePage
   * @param  {number} numberPage
   * @param  {string} keyword
   * @param  {string} configSearch
   * 
   */
  loadCurrencyList(sizePage: number, numberPage: number, keyword: string, configSearch: string) {
    this.currencyServices.getCurrenciesList(numberPage, sizePage, keyword, configSearch).subscribe(response => {
      this.configPagination(response.meta.total);
      this.currencies = response.data;
    },
      error => {
        console.log('error'); // add error handler
      })
  }

  /** dispaly number of columns from screen size
   * @param  {} event 
   */
  onResize(event) {
    this.numberCulumns = this.displaycolumns(event.target.innerWidth);
  }

   /**
   * @param  {} width
   * @returns number of columns to display
   */
  displaycolumns(width) {
    if (width <= 480) {
      return 1;
    } else if (width <= 768) {
      return 2;
    } else {
      return 6;
    }
  }
  /** search currency
   */
  searchCurrencies() {
    if (this.searchKeyword) {
      this.loadCurrencyList(0, +this.selectedOptionPagination, this.searchKeyword, this.selectedOptionFilter);
    }
  }
  /** config pagination
   * @param  {number} totalItems
   */
  configPagination(totalItems: number) {
    this.paginator = new PaginationConfig();
    this.paginator.totalItems = totalItems;
    this.paginator.maxSize = 5;
  }
  
  /** track pagination change to display data
   * @param  {PageChangedEvent} event
   */
  pageChanged(event: PageChangedEvent) {
    console.log(event.page,+this.selectedOptionPagination)
    this.paginator.currentPage = event.page;
    this.loadCurrencyList(this.paginator.currentPage, +this.selectedOptionPagination, this.searchKeyword, this.selectedOptionFilter);
  }
  setItemPerPage() {
    this.loadCurrencyList(this.paginator.currentPage, +this.selectedOptionPagination, this.searchKeyword, this.selectedOptionFilter);
  }
}
