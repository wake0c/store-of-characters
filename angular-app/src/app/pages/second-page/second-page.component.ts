import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent {
  constructor(private router: Router){}
  ngOnInit(): void {}

  GoFirstPage(){
    this.router.navigate(['home/firstpage']);
  }
}
