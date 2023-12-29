import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-confirmation-modal',
  standalone: true,
  imports: [RouterModule, NgbModalModule],
  templateUrl: './order-confirmation-modal.component.html',
  styleUrl: './order-confirmation-modal.component.scss'
})
export class OrderConfirmationModalComponent {
  @Input() orderId: string | null = null;

  constructor(public modal: NgbActiveModal) {}

}
