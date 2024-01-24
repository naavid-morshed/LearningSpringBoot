import {Routes} from '@angular/router';
import {HomePageComponent} from "./components/UserComponents/home-page/home-page.component";
import {MyOrderComponent} from "./components/UserComponents/my-order/my-order.component";
import {MyListOfOrdersComponent} from "./components/UserComponents/my-list-of-orders/my-list-of-orders.component";
import {PlaceOrderComponent} from "./components/UserComponents/place-order/place-order.component";
import {MyWishListComponent} from "./components/UserComponents/my-wish-list/my-wish-list.component";
import {AdminLogIn} from "./components/AdminComponents/admin-login-page/admin-log-in.component";
import {AdminPanel} from "./components/AdminComponents/admin-panel/admin-panel.component";
import {UpdateProductFormComponent} from "./components/AdminComponents/update-product-form/update-product-form.component";
import {AddProductFormComponent} from "./components/AdminComponents/add-product-form/add-product-form.component";
import {LoginComponent} from "./components/UserComponents/auth/login/login.component";
import {RegisterComponent} from "./components/UserComponents/auth/register/register.component";
import {MyAccountComponent} from "./components/UserComponents/my-account/my-account.component";

export const routes: Routes = [
  {path: "", component: HomePageComponent, title: "Home Page"},
  {path: "myorder", component: MyOrderComponent, title: "My Order"},
  {path: "listOfOrders", component: MyListOfOrdersComponent, title: "My Order List"},
  {path: "placeOrder", component: PlaceOrderComponent, title: "Order Table"},
  {path: "adminPanel", component: AdminPanel, title: "Admin Panel"},
  {path: "updateProduct/:id", component: UpdateProductFormComponent, title: "Product update page"},
  {path: "adminLogIn", component: AdminLogIn, title: "Admin Login Page"},
  {path: "login", component: LoginComponent, title: "User Login Page"},
  {path: "register", component: RegisterComponent, title: "Register User Page"},
  {path: "addProduct", component: AddProductFormComponent, title: "Add Product Page"},
  {path: "MyWishList", component: MyWishListComponent, title: "My WishList"},
  {path: "myaccount", component: MyAccountComponent, title: "My Account"}
];
