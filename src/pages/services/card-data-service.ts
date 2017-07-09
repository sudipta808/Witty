import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HTTPService } from "../../app/common/services/http.service";

@Injectable()
export class CardDataService {
    constructor(private _http: HTTPService){}

    public getCategoryDataById(id?: number): Observable<any> {
        return this._http.doGETCall("GET_DATA", {categoryId: id});
    }

}