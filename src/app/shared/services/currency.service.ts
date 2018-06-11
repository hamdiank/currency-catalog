import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CurrencyModel } from '../model/currency.model';


@Injectable()
export class CurrencyService {

  constructor(private http: HttpClient) { }

  /** get curreny by id
   * @param  {string} id
   * @returns Observable currency details
   */
  getCurrencyById(id: string): Observable<any> {

    return this.http.get(`https://api.openfintech.io/v1/currencies/` + id).pipe(map((response: any) => {
      return new CurrencyModel(response.data);
    }, (error: any) => {
      console.log(error);
    }));
  }
  /** get list of currency based on pagination and searching keys
   * @param  {number} sizePage
   * @param  {number} numberPage
   * @param  {string} keyword
   * @param  {string} configSearch
   * @returns Observable
   */
  getCurrenciesList(sizePage: number, numberPage: number, keyword: string, configSearch: string): Observable<any> {

    let url = this.getSpecificUrl(sizePage, numberPage, keyword, configSearch);
    console.log('url', url)
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      }, (error: any) => {
        console.log(error);
      }));
  }
  /** specy the correct url for displaying data
   * @param  {number} sizePage
   * @param  {number} numberPage
   * @param  {string} keyword
   * @param  {string} configSearch
   */
  getSpecificUrl(sizePage: number, numberPage: number, keyword: string, configSearch: string) {
    let url = 'https://api.openfintech.io/v1/currencies?page%5Bnumber%5D=' + numberPage + '&page%5Bsize%5D=' + sizePage;
    if (keyword && keyword.length > 0 && !configSearch) {
      console.log(keyword, configSearch);
      url = url + '&filter%5Bsearch%5D=' + keyword;
    }
    else if (keyword && keyword.length > 0 && configSearch) {
      console.log(keyword, configSearch);
      url = url + 'filter%5B' + configSearch + '3%5D=' + keyword;

    }
    return url
  }
}
