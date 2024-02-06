import {Routes} from '@angular/router';
import {HomePageComponent} from "./components/UserComponents/home-page/home-page.component";
import {MyOrderComponent} from "./components/UserComponents/my-order/my-order.component";
import {MyListOfOrdersComponent} from "./components/UserComponents/my-list-of-orders/my-list-of-orders.component";
import {PlaceOrderComponent} from "./components/UserComponents/place-order/place-order.component";
import {MyWishListComponent} from "./components/UserComponents/my-wish-list/my-wish-list.component";
import {AdminLogIn} from "./components/AdminComponents/admin-login-page/admin-log-in.component";
import {AdminPanel} from "./components/AdminComponents/admin-panel/admin-panel.component";
import {
  UpdateProductFormComponent
} from "./components/AdminComponents/update-product-form/update-product-form.component";
import {AddProductFormComponent} from "./components/AdminComponents/add-product-form/add-product-form.component";
import {LoginComponent} from "./components/UserComponents/auth/login/login.component";
import {RegisterComponent} from "./components/UserComponents/auth/register/register.component";
import {MyAccountComponent} from "./components/UserComponents/my-account/my-account.component";
import {ChangeDetailsComponent} from "./components/UserComponents/change-details/change-details.component";
import {RouterUrls} from "./environments/route-urls";

export const routes: Routes = [
  {
    path: RouterUrls.homePage.url,
    component: HomePageComponent,
    title: RouterUrls.homePage.title
  },
  {
    path: RouterUrls.myOrder.url,
    component: MyOrderComponent,
    title: RouterUrls.myOrder.title
  },
  {
    path: RouterUrls.myListOfOrders.url,
    component: MyListOfOrdersComponent,
    title: RouterUrls.myListOfOrders.title
  },
  {
    path: RouterUrls.placeOrder.url,
    component: PlaceOrderComponent,
    title: RouterUrls.placeOrder.title
  },
  {
    path: RouterUrls.adminPanel.url,
    component: AdminPanel,
    title: RouterUrls.adminPanel.title
  },
  {
    path: RouterUrls.updateProduct.url,
    component: UpdateProductFormComponent,
    title: RouterUrls.updateProduct.title
  },
  {
    path: RouterUrls.adminLogIn.url,
    component: AdminLogIn,
    title: RouterUrls.adminLogIn.title
  },
  {
    path: RouterUrls.login.url,
    component: LoginComponent,
    title: RouterUrls.login.title
  },
  {
    path: RouterUrls.register.url,
    component: RegisterComponent,
    title: RouterUrls.register.title
  },
  {
    path: RouterUrls.addProduct.url,
    component: AddProductFormComponent,
    title: RouterUrls.addProduct.title
  },
  {
    path: RouterUrls.myWishList.url,
    component: MyWishListComponent,
    title: RouterUrls.myWishList.title
  },
  {
    path: RouterUrls.changeDetails.url,
    component: ChangeDetailsComponent,
    title: RouterUrls.changeDetails.title
  },
  {
    path: RouterUrls.myaccount.url,
    component: MyAccountComponent,
    title: RouterUrls.myaccount.title
  }
];
