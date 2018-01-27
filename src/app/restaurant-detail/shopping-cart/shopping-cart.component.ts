import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from './shopping-cart.service'

import { MenuItem } from '../menu-item/menu-item.model'
import { CartItem } from './cart-item.model'

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): CartItem[] {
    return this.shoppingCartService.items
  }

  clear() {
    this.shoppingCartService.clear()
  }

  addItem(item: MenuItem) {
    this.shoppingCartService.addItem(item)
  }

  removeItem(item: CartItem) {
    this.shoppingCartService.removeItem(item)
  }

  total(): number {
    return this.shoppingCartService.total()
  }
}
