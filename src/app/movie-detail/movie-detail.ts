import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute และ Router
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // สำหรับ *ngIf, *ngFor

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule], // ต้องมี CommonModule สำหรับ *ngIf, *ngFor
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.scss']
})
export class MovieDetailComponent implements OnInit {
  movieId: string | null = null;
  movie: any = null; // เก็บข้อมูลรายละเอียดหนัง

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id'); // ดึงค่า id จาก URL
      if (this.movieId) {
        this.loadMovieDetails(this.movieId);
      }
    });
  }

  loadMovieDetails(id: string): void {
    this.http.get<any[]>('data/movie-details.json').subscribe({
      next: (allMovieDetails: any[]) => {
        this.movie = allMovieDetails.find(m => m.id === id); // หาหนังที่ตรงกับ ID
        if (!this.movie) {
          console.warn(`Movie with ID ${id} not found.`);
          this.router.navigate(['/page-not-found']); // หรือเปลี่ยนเส้นทางไปหน้า 404
        }
      },
      error: (error) => {
        console.error('Error loading movie details:', error);
        // จัดการ Error เช่น แสดงข้อความผิดพลาด
      }
    });
  }

  goToActorDetails(actorId: string): void {
    this.router.navigate(['/actor-details', actorId]); // ไปยังหน้ารายละเอียดนักแสดง
  }
}