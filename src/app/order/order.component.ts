import { Component, OnInit } from '@angular/core';

import { Order, OrderItem } from './order.model';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router'

import { RadioOption } from '../shared/radio/radio-option.model'
import { OrderService } from './order.service'
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  deliveryRate: number = 10

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService, 
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
        name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        confirmationEmail: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
        optionalAddress: this.formBuilder.control(''),
        paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validator: OrderComponent.equalsTo})
  }

  static equalsTo(group: AbstractControl): {[key: string] : boolean}{
    const email = group.get('email')
    const confirmationEmail = group.get('confirmationEmail')

    if(!email.value || !confirmationEmail.value){
      return undefined
    }

    if(email.value !== confirmationEmail.value){
      return {emailsNotMatch: true}
    }

    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  delivery(): number {
    return this.itemsValue() / this.deliveryRate
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem){
      this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
      this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
      this.orderService.remove(item)
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems().map( (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
                      .subscribe((orderId: string) => {
                        this.orderService.clear()
                        this.router.navigate(['/order-summary', orderId])
                      })
  }
}