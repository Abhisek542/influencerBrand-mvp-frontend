import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
 
  @Input() menu: { label: string; route: string; icon: string }[] = [];

  @Input() portal = 'Portal';
  @Input() username = 'User';
  @Input() email = '';
}
