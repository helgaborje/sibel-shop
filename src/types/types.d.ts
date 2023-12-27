export type Product = {
  id: string
  name: string
  price: number
  description: string
  image: string
}


export type Cart = {
  items: CartItem[]
}

export type CartItem = {
  product: string
  name: string
  price: number
  quantity: number
  id: string
}

export type Order = {
  id?: string
  firstName: string
  lastName: string
  email: string
  address: string[]
  total: number
  products: CartItem[]
  timestamp: string | number
}
