import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductFormComponent} from "./components/product-form/product-form.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {PlaceOrderComponent} from "./components/place-order/place-order.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ProductListComponent,
    ProductFormComponent,
    HomePageComponent,
    PlaceOrderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
}
