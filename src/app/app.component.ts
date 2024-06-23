import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeader: boolean = false;
  ngOnInit() {
    localStorage.removeItem('roles')
    localStorage.removeItem('userId')
  }
  title = 'infrrd-meeting';
}
