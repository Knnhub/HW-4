import { Component, inject } from '@angular/core';
// import { Header } from '../main/header/header';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Member as MemberData } from '../../service/appdata'; // Assuming MemberData is defined in appdata.ts
import { AppdataService } from '../../service/appdata'; // Import the service to manage members
@Component({
  selector: 'app-member',
  imports: [RouterModule,CommonModule],
  templateUrl: './member.html',
  styleUrl: './member.scss',
  standalone: true
})
export class Member {
  public appDataService = inject(AppdataService); // Assuming MemberData is the service you want to use
  constructor(private router: Router) {
    
  }
  changePage1() {
    this.router.navigateByUrl('/member/list');
  }
  changePage2() {
    this.router.navigateByUrl('/member/profile');
  }
  sendParams() {
    this.router.navigate(['/member/test'], {
      queryParams: { name: 'Phupha' },
    });
  }

    addMember(){
    //   let newMember: MemberData = {
    //   id: Math.random(),
    //   fullname: 'Test Fullname',
    //   image: 'Test Image'
    //   this.appData.members.push(newMemberData);
    //   console.log(this.appData.members);
    // };
    let member = new MemberData();
    member.id = Math.random();
    member.fullname = 'Test Fullname';
    member.image = 'Test Image';
    this.appDataService.members.push(member);
    console.log(this.appDataService.members);
  }
  addMemberSession() {
    let members: MemberData[] = []; // <-- กำหนด type ให้ชัดเจน
    if (sessionStorage.getItem('members')) {
      members = JSON.parse(sessionStorage.getItem('members')!);
    }
    // ใช้ MemberData interface/class สำหรับสร้าง Object
    let newMember: MemberData = {
      id: Math.random(),
      fullname: 'Test Fullname',
      image: 'Test Image'
    };
    members.push(newMember);
    sessionStorage.setItem('members', JSON.stringify(members));

    console.log(sessionStorage.getItem('members'));
    // let members = [];
    // if(sessionStorage.getItem('members')){
    //     members = JSON.parse(sessionStorage.getItem('members')!);
    // }
    // let member = new Member();
    // member.id = Math.random();
    // member.fullname = 'Test Fullname';
    // member.image = 'Test Image';
    // members.push(member);
    // sessionStorage.setItem('members', JSON.stringify(members));

    // console.log(sessionStorage.getItem('members'));
  }

   addMemberLocalStorage() {
    let members = [];
    if (localStorage.getItem('members')) {
      members = JSON.parse(localStorage.getItem('members')!);
    }
    let member = new MemberData();
    member.id = Math.random();
    member.fullname = 'Test Fullname';
    member.image = 'Test Image';
    members.push(member);
    localStorage.setItem('members', JSON.stringify(members));

    console.log(localStorage.getItem('members'));
  }

}
