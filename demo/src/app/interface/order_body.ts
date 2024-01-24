// export type ORDER_BODY = {
//   deliveryAddress: string
//   orderProductItemModelList: Array<{
//     price: number
//     productModel: {
//       id: number
//     }
//   }>
// }

export interface ORDER_BODY {
  deliveryAddress: string
  orderProductItemModelList: OrderProductItemModel[]
}

export interface OrderProductItemModel {
  price: number
  productModel: ProductModel
}

export interface ProductModel {
  id: number
}

