import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { catchError, of, Observable, map } from "rxjs";
import _ from "lodash"

import { environment } from "../../environments/environment";
import { LoginDto } from "./login/login.dto";
import { ApiResponse } from "../core/types/api-response.type";
import { ObjectHelper } from "../core/helpers/object.helper";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  public login(loginDto: LoginDto): Observable<ApiResponse> {
    const data = ObjectHelper.keysToSnakeCase(loginDto)
    return this.http.post(`${environment.apiUrl}/auth/login/`, data).pipe(
      map((res) => res as ApiResponse),
      catchError((error: HttpErrorResponse) => {
        if (error.status != HttpStatusCode.Unauthorized) {
          return of()
        }
        return of(error.error as ApiResponse)
      })
    )
  }

  public refresh(refreshToken: string): Observable<ApiResponse> {
    const data = {
      refresh_token: refreshToken
    }
    return this.http.post(`${environment.apiUrl}/auth/refresh/`, data).pipe(
      map((res) => res as ApiResponse)
    )
  }
  public test(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/test/`)
  }
}