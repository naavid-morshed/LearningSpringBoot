import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {AdminPanel} from "./components/AdminComponents/admin-panel/admin-panel.component";
import {UpdateProductFormComponent} from "./components/AdminComponents/update-product-form/update-product-form.component";
import {HomePageComponent} from "./components/UserComponents/home-page/home-page.component";
import {PlaceOrderComponent} from "./components/UserComponents/place-order/place-order.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AdminPanel,
    UpdateProductFormComponent,
    HomePageComponent,
    PlaceOrderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
}
