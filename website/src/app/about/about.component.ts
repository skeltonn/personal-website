import { Component, OnInit } from '@angular/core';

export interface Skill {
  name: string;
  value: number;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  skills: Skill[] = [
    {name: "Programming", value: 60},
    {name: "Listening", value: -1},
    {name: "Photography", value: 30},
    {name: "Being Antisocial", value: 80},

  ]

  constructor() { }

  ngOnInit() {
  }

}
