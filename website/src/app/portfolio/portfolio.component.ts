import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  title: string;
  image: string;
}


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  tiles: Tile[] = [
    {title: 'Swatched', text: 'One', cols: 1, rows: 1, color: 'lightblue', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Pattonville App', text: 'Three', cols: 1, rows: 1, color: 'lightpink', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Flood++', text: 'Two', cols: 2, rows: 2, color: 'lightgreen', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Garden', text: 'Four', cols: 1, rows: 1, color: 'lightyellow', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Rover Engagement Display', text: 'Four', cols: 1, rows: 1, color: 'lightyellow', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Rover Autonomy', text: 'Four', cols: 1, rows: 1, color: 'lightyellow', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'Personal Website', text: 'Four', cols: 1, rows: 1, color: 'lightyellow', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
