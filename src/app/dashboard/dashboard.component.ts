import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../auth/auth.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private service: AuthService) {
    this.service.test().subscribe(res => {
      console.log(res)
    })
  }
}
