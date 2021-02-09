import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Alert } from "./alert.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FolderService {


    constructor(private http: HttpClient){
    }

    postAlert(alert: Alert): Observable<Alert>{
        return this.http.post<Alert>(`https://demo8845022.mockable.io/api/alerts`, alert);
    }

}