import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";

@Injectable()
export class UserService {

    private readonly BASE_URL = "http://localhost:10000/api";

    constructor(
        private httpClient: HttpClient
    ){}

    getAllUsers(): Observable<User[]> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        return this.httpClient.get<User[]>(this.BASE_URL+'/user/all', options);
    }

    addUser(user: User): Observable<User> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        return this.httpClient.post<User>(this.BASE_URL+'/user', user, options);
    }

    updteUser(user: User) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        return this.httpClient.put(this.BASE_URL+'/user', user, options);
    }

    deleteUserById(id: Number): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        return this.httpClient.delete(this.BASE_URL+'/user?id='+id);
    }

}