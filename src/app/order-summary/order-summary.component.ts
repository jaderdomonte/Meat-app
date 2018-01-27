import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'mt-order-summary',
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {

  rated: boolean

  orderId: number

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.router.snapshot.params['id']
  }

  rate(){
    this.rated = true
  }
}
