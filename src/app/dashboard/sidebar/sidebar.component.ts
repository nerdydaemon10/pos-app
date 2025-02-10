import { Component } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { sidebarMenuItems } from './sidebar-menu-items.data';
import { SidebarDropdownMenuComponent } from './sidebar-dropdown-menu/sidebar-dropdown-menu.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgScrollbar,
    ButtonModule, 
    CommonModule,
    ScrollPanelModule,
    SidebarDropdownMenuComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  protected get sidebarMenuItems() {
    return sidebarMenuItems
  }
}
