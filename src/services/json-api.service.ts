import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JsonApiService {
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

  getUserTodos() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/todos');
  }
}
