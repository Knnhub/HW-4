import { Routes } from '@angular/router';
import { Member } from './pages/member/member';
import { Main } from './pages/main/main';
import { List } from './pages/member/list/list';
import { Profile } from './pages/member/profile/profile';
import { Pagenotfound } from './pages/pagenotfound/pagenotfound';
import { Test } from './pages/member/test/test';
import { MovieDetailComponent } from './movie-detail/movie-detail'; 
import { ActorDetailComponent } from './actor-detail/actor-detail';

export const routes: Routes = [
  { path: '', component: Main },
  {
    path: 'member',
    component: Member,
    children: [
      { path: 'list', component: List },
      { path: 'profile', component: Profile },
      { path: 'test/:id', component: Test },
      { path: 'test', component: Test },
      {path: 'Main', component: Main}, // เพิ่มเส้นทางสำหรับ Main  
    ],
  },
  {
    path: 'movie-details/:id', // <--- เพิ่ม Route สำหรับหน้ารายละเอียดหนัง
    component: MovieDetailComponent,
    title: 'Movie Details'
  },
  {
    path: 'actor-details/:id', // <--- เพิ่ม Route สำหรับหน้ารายละเอียดนักแสดง
    component: ActorDetailComponent,
    title: 'Actor Details'
  },
  { path: '**', component: Pagenotfound } // Wildcard route for a 404 page
];