import {Routes} from '@angular/router';
import {DropdownListComponent} from "./components/dropdown-list/dropdown-list.component";
import {MyOrderComponent} from "./components/my-order/my-order.component";
import {ListOfOrdersComponent} from "./components/list-of-orders/list-of-orders.component";

export const routes: Routes = [
  {path: "", component: DropdownListComponent,title:"Dropdown List"},
  {path: "myorder", component: MyOrderComponent,title:"My Order"},
  {path: "listOfOrders", component: ListOfOrdersComponent,title:"My Order List"}
];
