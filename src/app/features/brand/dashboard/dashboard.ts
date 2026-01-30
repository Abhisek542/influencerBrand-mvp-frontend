import { Component } from '@angular/core';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [StatCard,EmptyState,CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {


}
