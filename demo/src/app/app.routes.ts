import {Routes} from '@angular/router';
import {DropdownListComponent} from "./components/dropdown-list/dropdown-list.component";
import {MyOrderComponent} from "./components/my-order/my-order.component";
import {ListOfOrdersComponent} from "./components/list-of-orders/list-of-orders.component";
import {PlaceOrderTableComponent} from "./components/place-order-table/place-order-table.component";

export const routes: Routes = [
  {path: "", component: DropdownListComponent,title:"Home Page"},
  {path: "myorder", component: MyOrderComponent,title:"My Order"},
  {path: "listOfOrders", component: ListOfOrdersComponent,title:"My Order List"},
  {path: "placeOrderTable", component: PlaceOrderTableComponent,title:"Order Table"}
];
