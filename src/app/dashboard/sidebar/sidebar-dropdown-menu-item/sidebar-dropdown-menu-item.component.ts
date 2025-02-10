import _ from 'lodash'
import { Component, Input } from '@angular/core';
import { SidebarDropdownMenuItem } from './sidebar-dropdown-menu-item.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-dropdown-menu-item',
  imports: [CommonModule],
  templateUrl: './sidebar-dropdown-menu-item.component.html',
  styleUrl: './sidebar-dropdown-menu-item.component.css'
})
export class SidebarDropdownMenuItemComponent {
  @Input()
  public name!: string
  @Input()
  public path!: string
  @Input()
  public subitems!: SidebarDropdownMenuItem[]

  protected isOpen: boolean = false
  
  protected toggle() {
    this.isOpen = !this.isOpen
  }
  
  protected get hasSubItems(): boolean {
    return !_.isEmpty(this.subitems)
  }
}
