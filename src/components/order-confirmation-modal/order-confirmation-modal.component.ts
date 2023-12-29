import { Component } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './order-confirmation-modal.component.html',
  styleUrl: './order-confirmation-modal.component.scss'
})
export class OrderConfirmationModalComponent {

  constructor(public modal: NgbActiveModal) {}

}
