import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute และ Router
import { HttpClient } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common'; // สำหรับ *ngIf, *ngFor
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  safeTrailerUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private sanitizer: DomSanitizer
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
        this.movie = allMovieDetails.find(m => m.id === id);
        if (this.movie && this.movie.trailerUrl) {
          const youtubeId = this.getYoutubeVideoId(this.movie.trailerUrl);
          if (youtubeId) {
            // สร้าง embed URL และทำให้ปลอดภัย
            this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${youtubeId}`
            );
          }
        }
        if (!this.movie) {
          console.warn(`Movie with ID ${id} not found.`);
          this.router.navigate(['/page-not-found']);
        }
      },
      error: (error) => {
        console.error('Error loading movie details:', error);
      }
    });
  }

  getYoutubeVideoId(url: string): string | null {
    // ดึง ID ของวิดีโอจาก URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  goToActorDetails(actorId: string): void {
    this.router.navigate(['/actor-details', actorId]); // ไปยังหน้ารายละเอียดนักแสดง
  }

  goBack(): void { // <--- เพิ่มเมธอดสำหรับปุ่ม Back
    this.router.navigate(['/']);
  }
}