import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // สำหรับ *ngIf, *ngFor

@Component({
  selector: 'app-actor-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-detail.html',
  styleUrls: ['./actor-detail.scss']
})
export class ActorDetailComponent implements OnInit {
  actorId: string | null = null;
  actor: any = null; // เก็บข้อมูลรายละเอียดนักแสดง

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.actorId = params.get('id'); // ดึงค่า id จาก URL
      if (this.actorId) {
        this.loadActorDetails(this.actorId);
      }
    });
  }

  loadActorDetails(id: string): void {
    this.http.get<any[]>('data/actors.json').subscribe({
      next: (allActors: any[]) => {
        this.actor = allActors.find(a => a.id === id); // หานักแสดงที่ตรงกับ ID
        if (!this.actor) {
          console.warn(`Actor with ID ${id} not found.`);
          this.router.navigate(['/page-not-found']); // หรือเปลี่ยนเส้นทางไปหน้า 404
        }
      },
      error: (error) => {
        console.error('Error loading actor details:', error);
        // จัดการ Error
      }
    });
  }

  // สามารถเพิ่มฟังก์ชัน back หรืออื่นๆ ได้
  goBack(): void {
    this.router.navigateByUrl('/'); // ตัวอย่าง: กลับหน้าหลัก
  }
}