// src/app/actor-detail/actor-detail.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // สำหรับทดสอบ HTTP
import { ActivatedRoute } from '@angular/router'; // สำหรับทดสอบ ActivatedRoute
import { of } from 'rxjs'; // สำหรับสร้าง Observable

import { ActorDetailComponent } from './actor-detail';

describe('ActorDetailComponent', () => {
  let component: ActorDetailComponent;
  let fixture: ComponentFixture<ActorDetailComponent>;
  let httpTestingController: HttpTestingController;

  // Mock ActivatedRoute เพื่อให้สามารถทดสอบการดึง paramId ได้
  const mockActivatedRoute = {
    paramMap: of({ get: (key: string) => 'robert-pattinson' }) // สมมติว่า id คือ robert-pattinson
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorDetailComponent, HttpClientTestingModule], // ใส่ ActorDetailComponent และ HttpClientTestingModule ใน imports
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents(); // สำหรับ Non-Standalone components; Standalone Components ไม่จำเป็นต้องมี

    fixture = TestBed.createComponent(ActorDetailComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges(); // ตรวจจับการเปลี่ยนแปลงเริ่มต้น (เช่น ngOnInit)
  });

  afterEach(() => {
    // ตรวจสอบว่าไม่มี HTTP requests ที่ค้างอยู่
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load actor details on ngOnInit', () => {
    // ตรวจสอบว่ามีการเรียก HTTP Request ไปยัง data/actors.json
    const req = httpTestingController.expectOne('data/actors.json');
    expect(req.request.method).toEqual('GET');

    // จำลองข้อมูลตอบกลับจาก JSON
    req.flush([
      { id: 'robert-pattinson', name: 'Robert Pattinson', bio: '...', image: '...', birthDate: '...', knownFor: ['...'] }
    ]);

    // ตรวจสอบว่าข้อมูลนักแสดงถูกกำหนดใน component
    expect(component.actor).toBeTruthy();
    expect(component.actor.name).toEqual('Robert Pattinson');
  });

  // คุณสามารถเพิ่ม test case อื่นๆ ได้ที่นี่ เช่น
  // it('should navigate to 404 page if actor not found', () => { ... });
  // it('should call goBack method when button is clicked', () => { ... });

});