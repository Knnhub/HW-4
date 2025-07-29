import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Main } from './pages/main/main';
import { Header } from './pages/main/header/header';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Main,Header,BrowserModule,
    HttpClientModule ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-router';
}
