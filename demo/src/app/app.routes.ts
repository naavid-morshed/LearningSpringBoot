import {Routes} from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {MyOrderComponent} from "./components/my-order/my-order.component";
import {ListOfOrdersComponent} from "./components/list-of-orders/list-of-orders.component";
import {PlaceOrderComponent} from "./components/place-order/place-order.component-HOSE2406206292A";

export const routes: Routes = [
  {path: "", component: HomePageComponent, title: "Home Page"},
  {path: "myorder", component: MyOrderComponent, title: "My Order"},
  {path: "listOfOrders", component: ListOfOrdersComponent, title: "My Order List"},
  {path: "placeOrderTable", component: PlaceOrderComponent, title: "Order Table"}
];
