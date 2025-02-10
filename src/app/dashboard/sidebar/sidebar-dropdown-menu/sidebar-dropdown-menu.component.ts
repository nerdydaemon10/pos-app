import _ from 'lodash'
import { Component, Input } from '@angular/core';
import { SidebarDropdownMenuItem } from '../sidebar-dropdown-menu-item/sidebar-dropdown-menu-item.type';
import { SidebarDropdownMenuItemComponent } from '../sidebar-dropdown-menu-item/sidebar-dropdown-menu-item.component';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-sidebar-dropdown-menu',
  imports: [CommonModule, RippleModule, SidebarDropdownMenuItemComponent],
  templateUrl: './sidebar-dropdown-menu.component.html',
  styleUrl: './sidebar-dropdown-menu.component.css'
})
export class SidebarDropdownMenuComponent {
  @Input()
  public name!: string
  @Input()
  public icon!: string
  @Input()
  public items!: SidebarDropdownMenuItem[]

  protected isOpen: boolean = false

  protected toggle() {
    this.isOpen = !this.isOpen
  }

  protected get hasItems() {
    return !_.isEmpty(this.items)
  }
}
