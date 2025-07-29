import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // เพิ่ม Router

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'] // ใช้ scss ตามที่คุณตั้งค่าใน angular.json
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any; // รับข้อมูลหนังเข้ามาเป็น Input

  constructor(private router: Router) { } // Inject Router

  ngOnInit(): void {
  }

  // เมื่อคลิกที่การ์ด ให้ไปที่หน้ารายละเอียด (ยังไม่มีหน้านั้น แต่เตรียมไว้)
  goToDetails(): void {
    this.router.navigate(['/movie-details', this.movie.id]);
  }
}