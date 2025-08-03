import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-actor-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './actor-detail.html',
  styleUrls: ['./actor-detail.scss']
})
export class ActorDetailComponent implements OnInit {
  actorId: string | null = null;
  actor: any = null;
  knownForMovies: { movie: any; safeTrailerUrl: SafeResourceUrl | null }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.actorId = params.get('id');
      if (this.actorId) {
        this.loadActorDetails(this.actorId);
      }
    });
  }

  loadActorDetails(id: string): void {
    this.http.get<any[]>('data/actors.json').subscribe({
      next: (allActors: any[]) => {
        this.actor = allActors.find(a => a.id === id);
        if (this.actor) {
          this.loadKnownForMovies();
        } else {
          console.warn(`Actor with ID ${id} not found.`);
          this.router.navigate(['/page-not-found']);
        }
      },
      error: (error) => {
        console.error('Error loading actor details:', error);
      }
    });
  }

  loadKnownForMovies(): void {
    this.http.get<any[]>('data/movie-details.json').subscribe({
      next: (allMovieDetails: any[]) => {
        const movies = allMovieDetails.filter(movie =>
          movie.cast.some((castMember: any) => castMember.id === this.actorId)
        );
        this.knownForMovies = movies.map(movie => ({
          movie: movie,
          safeTrailerUrl: this.safeTrailerUrl(movie.trailerUrl)
        }));
      },
      error: (error) => {
        console.error('Error loading movie details for actor:', error);
      }
    });
  }

  safeTrailerUrl(url: string): SafeResourceUrl | null {
    const youtubeId = this.getYoutubeVideoId(url);
    if (!youtubeId) {
        return null;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${youtubeId}`);
  }

  getYoutubeVideoId(url: string): string | null {
    if (!url) {
      return null;
    }
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
    return match ? match[1] : null;
  }

  goBack(): void {
    this.location.back();
  }
}