import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // <--- ต้อง import Router
import { CommonModule } from '@angular/common'; // <--- สำหรับ *ngIf, *ngFor (ถ้าใช้ใน template ของ movie-card)
// สำหรับ RouterLink ใน template ถ้าใช้ [routerLink] ต้อง import RouterModule ด้วย

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule], // <--- เพิ่ม CommonModule ถ้ามี *ngIf, *ngFor ใน movie-card.html
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any;

  constructor(private router: Router) { } // <--- Inject Router

  ngOnInit(): void { }

  goToDetails(): void {
    if (this.movie && this.movie.id) {
      this.router.navigate(['/movie-details', this.movie.id]); // <--- พาธที่เชื่อมไปยังหน้ารายละเอียดหนัง
    }
  }
}