import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://api.promsys.id";
  constructor(private httpClient: HttpClient) { }

  readUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/read.php`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/create.php`, user);
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(`${this.PHP_API_SERVER}/update.php`, user);
  }

  deleteUser(id: number) {
    return this.httpClient.delete<User>(`${this.PHP_API_SERVER}/delete.php/?id=${id}`);
  }
}
