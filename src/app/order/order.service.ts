import { Injectable } from '@angular/core';

import { Order, OrderItem} from './order.model';
import { MEAT_API } from '../app.api';

import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service'
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model'

@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService, private http: Http){}

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }
    
    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        this.cartService.removeItem(item)
    }

    itemsValue(): number {
        return this.cartService.total()
    }

    checkOrder(order: Order): Observable<string>{
        return this.http.post(`${MEAT_API}/orders`, 
                                JSON.stringify(order),
                                new RequestOptions({headers: this.createJsonHeaders()}))
                        .map(response => response.json())
                        .map(order => order.id);
    }

    createJsonHeaders(): Headers {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');

        return headers;
    }

    clear(): void {
        this.cartService.clear();
    }
}