import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { User2 } from 'src/app/model/user2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = '/api/users'

  private message!: string 

  constructor(private http: HttpClient) { }

  setMessage(message: string) {
    this.message = message
  }

  getMessage() {
    return this.message
  }

  getUser(id: number) {
    return this.http.get<User>(this.BASE_URL+'/'+id)
  }

  getUsers() {
    return this.http.get<User[]>(this.BASE_URL)
  }

  addUser(user: User2) {
    return this.http.post<any>(this.BASE_URL, user)
  }

  updateUser(id:number, user: User) {
    return this.http.put<any>(this.BASE_URL+'/'+id, user)
  }

  deleteUsers(ids:number[]) {
    return this.http.delete<any>(this.BASE_URL+'/'+ids)
  }

  login(username: string, password: string) {
    const requestHeader = {
      headers: new HttpHeaders(
       { "No-Auth": "True"}
      )
    }
    return this.http.post('/api/login', { username, password }, requestHeader)
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null
  }

  getToken() {
    return localStorage.getItem('token') || ''
  }

}
