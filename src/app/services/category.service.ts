import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HTTPService } from "../common/services/http.service";

@Injectable()

export class CategoryService {
    constructor(private _http: HTTPService){}

    public getAllCategoryData(): Observable<any> {
        return this._http.doGETCall("CATEGORY");
    }
}