import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HTTPService } from "../common/services/http.service";

@Injectable()

export class CategoryService {
    categoryData: any[];
    constructor(private _http: HTTPService){}

    public getAllCategoryData(): Observable<any> {
        return this._http.doGETCall("CATEGORY");
    }

    public setCategory(category: any[]): void {
        if(category)
            this.categoryData = category;
    }

    public getCategory(): any[] {
        if(this.categoryData)
            return this.categoryData;
        
        return [];
    }

}