import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router) {}
  user: string = '';
  approved: boolean = false;
  ngOnInit() {
    this.dataService.userDetails.subscribe((user: any) => {
      this.user = user?.name;
      this.approved = user?.role === 'manager' ? true: false;
    });
  }

  /**
   * Logs out of application
   */
  logout() {
    this.dataService.getUserDetails('');
    this.router.navigate(['/login']);
  }
}
