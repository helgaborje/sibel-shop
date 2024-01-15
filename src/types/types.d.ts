export type Product = {
  id?: string
  name: string
  size?: string
  price: number
  description: string
  image: string[]
  editProduct?: boolean
  [key: string]: any;
}

export type Cart = {
  items: CartItem[]
}

export type CartItem = {
  product: string
  name: string
  size?: string
  color?: string
  price: number
  quantity: number
  id: string
}

export type Order = {
  id?: string
  shipment: string
  payment: string
  firstName: string
  lastName: string
  email: string
  address: string[]
  total: number
  products: CartItem[]
  timestamp: string | number
  pending: boolean
}
