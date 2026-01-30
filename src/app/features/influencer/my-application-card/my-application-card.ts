import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-application-card',
  imports: [CommonModule],
  templateUrl: './my-application-card.html',
  styleUrl: './my-application-card.css',
})
export class MyApplicationCard {
 @Input() title = '';
  @Input() brand = '';
  @Input() message = '';
  @Input() date = '';
  @Input() status: 'Pending' | 'Accepted' | 'Rejected' = 'Pending';

}
