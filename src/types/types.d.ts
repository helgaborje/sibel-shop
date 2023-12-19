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
