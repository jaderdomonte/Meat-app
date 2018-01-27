import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { ActivatedRoute } from '@angular/router'
import { RestaurantsService} from '../../restaurants/restaurant/restaurants.service'

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private restaurantService: RestaurantsService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantService.reviewsOfRestaurant(this.router.parent.snapshot.params['id'])
  }

}
