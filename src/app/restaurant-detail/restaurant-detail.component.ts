import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Restaurant } from '../restaurants/restaurant/restaurant.model'
import { RestaurantsService } from '../restaurants/restaurant/restaurants.service'


@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant

  constructor(private restaurantsService: RestaurantsService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.restaurantsService.restaurantById(this.router.snapshot.params['id'])
        .subscribe(restaurant => this.restaurant = restaurant)
  }
}
