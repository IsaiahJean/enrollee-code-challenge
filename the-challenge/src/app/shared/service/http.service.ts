import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /** Variable define here */
  public baseApiURL = environment.baseUrl;

  headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) };
  constructor(
    private http: HttpClient) {
  }

  /** Get Response from API for Get Method */
  getResponse(): Observable<any> {
    return this.http.get(this.baseApiURL, this.headers);
  }
  /** Get Response by ID */
  getById(id: any): Observable<any> {
    return this.http.get(this.baseApiURL + id, this.getHeaderOptions());
  }
  /** PUT method */
  putById(id: any, data:any): Observable<any> {
    return this.http.put(this.baseApiURL + id, data, this.getHeaderOptions());
  }

  /** Get Header Options for Post Data with Content Type  */
  private getHeaderOptions() {
    return {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
        })
    };
  }
}