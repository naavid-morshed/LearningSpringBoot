import {Routes} from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {MyOrderComponent} from "./components/my-order/my-order.component";
import {ListOfOrdersComponent} from "./components/list-of-orders/list-of-orders.component";
import {PlaceOrderComponent} from "./components/place-order/place-order.component";
import {MyWishListComponent} from "./components/my-wish-list/my-wish-list.component";

export const routes: Routes = [
  {path: "", component: HomePageComponent, title: "Home Page"},
  {path: "myorder", component: MyOrderComponent, title: "My Order"},
  {path: "listOfOrders", component: ListOfOrdersComponent, title: "My Order List"},
  {path: "placeOrderTable", component: PlaceOrderComponent, title: "Order Table"},
  {path: "MyWishList", component: MyWishListComponent, title: "My WishList"}
];
