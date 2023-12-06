import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { JsonApiService } from '../../services/json-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, MatListModule, HttpClientModule, MatCardModule],
  providers: [JsonApiService, BrowserModule, HttpClient],
})
export class HomeComponent implements OnInit {
  constructor(private jsonApi: JsonApiService) {}

  users: any[] = [];
  allUsers: any[] = [];
  todoData: any = [];
  displayContent: boolean = false;
  usersUnavailable: boolean = false;
  selectedUser: string = '';
  ngOnInit() {
    this.jsonApi.getUsers().subscribe((d: any) => {
      console.log(d);
      d.forEach((e: { name: string; id: number }) =>
        this.users.push({ name: e.name, id: e.id })
      );
      console.log(this.users);
      this.allUsers = this.users;
      if (this.users.length == 0) {
        this.usersUnavailable = true;
      } else {
        this.usersUnavailable = false;
      }
    });
  }

  getUserData(userid: number, name: string) {
    console.log(userid);
    this.todoData = [];
    this.jsonApi.getUserTodos().subscribe((d: any) => {
      console.log(d);
      this.selectedUser = name;
      let a: any = d.filter(
        (e: { userId: number; title: string; completed: string }) =>
          e.userId == userid
      );

      a.forEach((e: { title: any; completed: any }) => {
        this.todoData.push({
          title: e.title,
          completed: e.completed,
        });
      });

      this.todoData.sort(
        (a: { completed: boolean }, b: { completed: boolean }) =>
          Number(a.completed) - Number(b.completed)
      );
      console.log(this.todoData);
      this.displayContent = true;
    });
  }

  onKey(text: any) {
    console.log(text.target.value);
    let searchText = text.target.value;

    this.users = this.allUsers.filter((a) => a.name.includes(searchText));

    if (this.users.length == 0) {
      this.usersUnavailable = true;
    } else {
      this.usersUnavailable = false;
    }
  }
}
