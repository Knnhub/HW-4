import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppdataService {
  members = Array<Member>();
  constructor() { }
}

export class Member {
  id : number = 0;
  fullname : string = '';
  image : string = '';
}
