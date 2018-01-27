import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'
import { RatingComponent } from './rating/rating.component'

import { RestaurantsService } from '../restaurants/restaurant/restaurants.service'
import { OrderService } from '../order/order.service'
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service'

import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common'

import { NgModule, ModuleWithProviders } from '@angular/core'

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent],
    imports: [ReactiveFormsModule, FormsModule, CommonModule],
    exports: [InputComponent, RadioComponent, RatingComponent, 
              ReactiveFormsModule, FormsModule, CommonModule]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [RestaurantsService, OrderService, ShoppingCartService]
        }
    }
}