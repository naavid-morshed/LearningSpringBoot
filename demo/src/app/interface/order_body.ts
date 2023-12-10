export type ORDER_BODY = {
  deliveryAddress: string
  orderProductItemModelList: Array<{
    price: number
    productModel: {
      id: number
    }
  }>
}

// export interface ORDER_BODY {
//   deliveryAddress: string
//   orderProductItemModelList: OrderProductItemModelList[]
// }
//
// export interface OrderProductItemModelList {
//   price: number
//   productModel: ProductModel
// }
//
// export interface ProductModel {
//   id: number
// }

