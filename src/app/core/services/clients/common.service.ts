import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`http://localhost:3000/${path}`);
  }

  post<T>(path: string, data?: object): Observable<T> {
    return this.http.post<T>(`http://localhost:3000/${path}`, data);
  }

  put<T>(path: string, data?: object): Observable<T> {
    return this.http.put<T>(`http://localhost:3000/${path}`, data);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`http://localhost:3000/${path}`);
  }
}
