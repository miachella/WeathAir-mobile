import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Alert, Township } from "./alert.model";
import { Observable } from "rxjs";
import { delay } from 'rxjs/operators';
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

    // getTownshipsAsync(timeout = 1000): Observable<Township[]> {
    //     return new Observable<Township[]>(observer => {
    //      this.getTownships().subscribe(res => {
    //           observer.next(res)
    //       });
    //       observer.complete();
    //     }).pipe(delay(timeout));
    //   }



}