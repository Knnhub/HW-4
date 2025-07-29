import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.html',
  styleUrl: './test.scss'
})
export class Test {
  id = '';
  name! : string;
  constructor(private activeatedRoute: ActivatedRoute) {
    activeatedRoute.queryParamMap.subscribe((params) => {
      this.name =
        this.activeatedRoute.snapshot.queryParamMap.get('name') || 'No Name';
    });
  }
  

  ngOnInit() {
    this.id = this.activeatedRoute.snapshot.paramMap.get('id') || '';
    this.name = this.activeatedRoute.snapshot.queryParamMap.get('name') || 'No Name';
  }
}
