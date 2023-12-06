import 'zone.js';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  template: `
    <h1>TODO App</h1>
    <app-home></app-home>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
