import { Component, OnInit } from '@angular/core';
// import { Header } from './header/header';
import { HttpClient } from '@angular/common/http';
import { MovieCardComponent } from '../../movie-card/movie-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ MovieCardComponent, CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main implements OnInit {
  movies: any[] = []; // เก็บข้อมูลหนัง
  
  constructor(private http: HttpClient) { } // Inject HttpClient

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    // พาธไปยังไฟล์ JSON ของคุณในโฟลเดอร์ public
    this.http.get('data/movies.json').subscribe({
      next: (data: any) => {
        this.movies = data;
        console.log('Movies loaded:', this.movies); // ตรวจสอบใน console
      },
      error: (error) => {
        console.error('Error loading movies:', error);
      }
    });
  }
  
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-main',
//   templateUrl: './main.html'
// })
// export class Main {}