import { Routes } from '@angular/router';
import { Member } from './pages/member/member';
import { Main } from './pages/main/main';
import { List } from './pages/member/list/list';
import { Profile } from './pages/member/profile/profile';
import { Pagenotfound } from './pages/pagenotfound/pagenotfound';
import { Test } from './pages/member/test/test';


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
  { path: '**', component: Pagenotfound } // Wildcard route for a 404 page
];