export type Product = {
  id: number
  image: string
  name: string
  description: string
  price: number
}


export type Cart = {
  items: CartItem[]
}

export type CartItem = {
  product: string
  name: string
  price: number
  quantity: number
  id: number
}
