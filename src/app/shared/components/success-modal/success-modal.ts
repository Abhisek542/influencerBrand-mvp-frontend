import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  imports: [CommonModule],
  templateUrl: './success-modal.html',
  styleUrl: './success-modal.css',
})
export class SuccessModal {
  
  
  @Input() visible = false;
  @Input() title = 'Success!';
  @Input() message = '';

  @Output() confirmed = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  onConfirm() {
    
    this.confirmed.emit();
  }

  onOverlayClick(event: MouseEvent) {
    
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.confirmed.emit();
    }
  }
}
