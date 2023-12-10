import {Component, Input} from '@angular/core';
import {PRODUCT} from "../../../interface/PRODUCT";
import {NgForOf, NgStyle} from "@angular/common";
import {faEdit, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [
    NgForOf,
    FaIconComponent,
    NgStyle
  ],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css'
})
export class OrderTableComponent {
  @Input() orderTable: PRODUCT[] = [];
  public faTime: IconDefinition = faTimes;

  deleteItem(item: PRODUCT): void {
    this.orderTable.splice(this.orderTable.indexOf(item), 1);
  }
}
