export type ORDER = {
  id: number
  deliveryAddress: string
  orderProductItemModelList: Array<{
    id: number
    price: number
    productModel: {
      id: number
      name: string
      specifications: string
      price: number
    }
  }>
}
