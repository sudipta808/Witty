import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import { Subject } from "rxjs/Subject";
import { Settings } from './settings.constant';
import { EnvironmentConstant } from './environmentService.constant';


@Injectable()
export class HTTPService extends Http {
  private _params: any;
  private _requestMethod: string;
  private _timeout: number;
  private _headers: any;
  private _localHeader: any;
  private _url: string;
  private _isLocal: boolean;
  private _requestMethodCode: number;
  private _indicatorSubject: Subject<Boolean>;
  private _isShowIndicator: boolean;
  private _noNetworkAlert: boolean;
  private _noNetworkSubject: Subject<Boolean>;

  constructor(backend: XHRBackend, options: RequestOptions) {
    let token = "Bearer " + localStorage.getItem('authToken');
    if(localStorage.getItem('authToken'))
      options.headers.set('Authorization', token);
    super(backend, options);

    this._isLocal = JSON.parse(localStorage.getItem('is_local'));
    this._isLocal = this._isLocal || (Settings.SERVER.DEFAULT_ENVIRONMENT === Settings.SERVER.ENVIRONMENTS[0] ? true : this._isLocal);
    this._params = {};
    this._timeout = Settings.API_CONNECTION_TIMEOUT;
    this._headers = Settings.API_HEADER;
    this._localHeader = Settings.LOCAL.HEADER;
    this._indicatorSubject = new Subject<boolean>();
    this._noNetworkSubject = new Subject<boolean>();
  }

  private setIsShowIndicator(indicator: boolean): void {
    this._isShowIndicator = indicator;
    this._indicatorSubject.next(indicator);
  }

  public showIndicator(): Observable<Boolean> {
    return this._indicatorSubject.asObservable();
  }

  private setNoNetwork(isNetwork: boolean): void {
    this._noNetworkAlert = isNetwork;
    this._noNetworkSubject.next(isNetwork);
  }

  public showNoNetworkAleart(): Observable<Boolean> {
    return this._noNetworkSubject.asObservable();
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = "Bearer " + localStorage.getItem('authToken');
    this._isLocal = JSON.parse(localStorage.getItem('is_local'));
    let isLocal = this._isLocal;
    this.setIsShowIndicator(true);

    if (typeof url === 'string' && localStorage.getItem('authToken')) {
      options.headers.set('Authorization', token);
    } else {
      if (!options) {
        if (isLocal) {
          //for STUB
          options = { headers: new Headers(this._localHeader) };
        }
        else {
          //From Live URL
          options = { headers: new Headers(this._headers) };
        }
      }
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: HTTPService) {
    return (res: Response) => {
      this.setIsShowIndicator(false);
      console.log(res);
      this.setNoNetwork(true);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }

  private getUrl(apiName: string) {
    var url = this._isLocal ? (Settings.LOCAL.PATH + EnvironmentConstant[Settings.SERVER.DEFAULT_ENVIRONMENT][apiName]) :
      (EnvironmentConstant[Settings.SERVER.DEFAULT_ENVIRONMENT].HOST);
    return url;
  }

  private formatData(data) {
    let returnData = '';
    let count = 0;
    for (let i in data) {
      if (count == 0) {
        returnData += i + '=' + data[i];
      } else {
        returnData += '&' + i + '=' + data[i];
      }
      count = count + 1;
    }
    return returnData;
  }

  public filterResponseData(res: Response): any {
    this.setIsShowIndicator(false);

    let body = res.json();
    if (this._isLocal && this._params.id) {
      this._params.userId = this._params.id;
      for (let i = 0; i < body.length; i++) {
        if (body[i].id === this._params.userId) {
          body = body[i];
        }
      }
    }
    else if(!this._isLocal) {
      return body;
    }
    return body || {};
  }

  public addParam(key, value): void {
    this._params[key] = value;
  }

  public addHeader(key, value): void {
    this._headers[key] = value;
  }

  public doGETCall(apiName: string, paramObject?: any): Observable<Response> {
    this._isLocal = JSON.parse(localStorage.getItem('is_local'));
    if(paramObject)
      this._params = paramObject;

    if (this._isLocal)
      this._url = this.getUrl(apiName);
    else {
      this._url = this.getUrl(apiName) + EnvironmentConstant[Settings.SERVER.DEFAULT_ENVIRONMENT][apiName];

      if(paramObject)
        this._url += Object.keys(this._params).length ? ("?" + this.formatData(this._params)) : "";
    }

    return super.get(this._url)
                .map(resp => {
                  return this.filterResponseData(resp);
                });
  }

  public doPOSTCall(apiName: string, body?: any): Observable<Response> {
    this._isLocal = JSON.parse(localStorage.getItem('is_local'));
    if (this._isLocal)
      this._url = this.getUrl(apiName);
    else
      this._url = this.getUrl(apiName) + EnvironmentConstant[Settings.SERVER.DEFAULT_ENVIRONMENT][apiName];

    return super.post(this._url, body)
                .map(resp => {
                  return this.filterResponseData(resp);
                });
  }
}