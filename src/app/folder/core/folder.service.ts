import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Alert, Township } from "./alert.model";
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

    getTownships(): Observable<Township[]>{
        return this.http.get<Township[]>(`https://demo6510050.mockable.io/api/townships`);    
    }

    filter(name: string): Township[] | void {
        const filterValue = name.toLowerCase();
        this.getTownships().subscribe(res => {
            return res.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)
            .slice(0, 5);
        }, err => console.log(err))
    }

}