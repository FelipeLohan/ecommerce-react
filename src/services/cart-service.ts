import { OrderDTO } from "../models/order";
import * as cartRepository from "../localstorage/cart-repository.ts"

export function saveCart(cart: OrderDTO){
  cartRepository.save(cart)
}