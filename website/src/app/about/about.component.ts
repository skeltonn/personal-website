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
    {name: "Java", value: 70},
    {name: "C#", value: 60},
    {name: "Python", value: 70},
    {name: "UI Design", value: 80},
    {name: "Javascript", value: 30},
    {name: "SQL", value: 30},
    {name: "C++", value: 60},
    {name: "Gaming", value: 50},
    {name: "Photography", value: 30},
    {name: "Sports", value: 20},
    {name: "Cooking", value: 40}

  ]

  constructor() { }

  ngOnInit() {
  }

}
