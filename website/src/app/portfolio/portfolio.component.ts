import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  title: string;
  image: string;
  chips: Array<string>;
  link: string;
}


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipCtrl = new FormControl();
  filteredChips: Observable<string[]>;
  chips: string[] = [];
  allChips: string[] = ['Android', 'Java', 'Material', 'Python', 'Raspberry Pi', 'C#', 'WPF', 'OpenCV', 'Angular'];

  @ViewChild('chipInput', {static: false}) chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;


  allTiles: Tile[] = [
    {title: 'MRDT: Rover Engagement Display', text: 'The operations control system for the Mars Rover Design Team, which drives the rover for all tasks with developement focused on user experience and functionality of the rover', cols: 2, rows: 2, image: 'assets/projects/basestation.JPG', chips: ["C#", "WPF"], link: "https://github.com/MissouriMRDT/BaseStation_Software/"},
    {title: 'Swatched', text: 'A mobile app designed to assist artists and web designers develop and save color palettes easily', cols: 1, rows: 2, image: 'assets/projects/swatched.png', chips: ["Android", "Java", "Material"], link: "https://play.google.com/store/apps/details?id=io.abstractappinnovations.swatched"},
    {title: 'Pattonville App', text: 'A group project with 3 other Android developers to create an app to support our school district\'s communication needs', cols: 1, rows: 2, image: 'assets/projects/psd.png', chips: ["Android", "Java", "Material"], link: "https://play.google.com/store/apps/details?id=org.pattonvillecs.pattonvilleapp"},
    {title: 'MRDT: Autonomy', text: 'The autonomous program the Mars Rover Design Team uses in the Autonomy task of the University Rover Challenge', cols: 2, rows: 2, image: 'assets/projects/autonomy.JPG', chips: ["Python", "OpenCV"], link: "https://github.com/MissouriMRDT/Autonomy_Software"},
    {title: 'Flood++', text: 'A mobile game that utilizes Swatched palettes where players flood a game board with a single color', cols: 1, rows: 2, image: 'assets/projects/flood++.png', chips: ["Android", "Java", "Material"], link: "https://play.google.com/store/apps/details?id=io.abstractappinnovations.flood"},
    {title: 'Garden', text: 'A python project to be run on a RPi to make gardens smart through automated watering', cols: 1, rows: 2, image: 'assets/projects/garden.jpeg', chips: ["Python", "Raspberry Pi"], link: "https://github.com/skeltonn/Garden"},
    {title: 'Personal Website', text: 'A website to display projects like this one, and a platform for future web ideas', cols: 1, rows: 2, image: 'assets/projects/website.png', chips: ["Angular", "Material"], link: "https://github.com/skeltonn/personal-website"}
  ]
  tiles: Tile[] = [];

  constructor() { 
    this.filteredChips = this.chipCtrl.valueChanges.pipe(
      startWith(null),
      map((chip: string | null) => chip ? this._filter(chip) : this.allChips.slice()));

    this._referesh();
  }
  
  add(event: MatChipInputEvent): void {
    // Add chip only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our chip
      if ((value || '').trim()) {
        this.chips.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.chipCtrl.setValue(null);
    }

    this._referesh();
  }

  remove(chip: string): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }

    this._referesh();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chips.push(event.option.viewValue);
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allChips.filter(chip => chip.toLowerCase().indexOf(filterValue) === 0);
  }

  private _referesh(): void {

    this.tiles = this.allTiles.filter(tile => this._passesFilter(tile));
    console.log(this.tiles);
    
  }

  private _passesFilter(tile: Tile): boolean {
    var accept = true;
    this.chips.forEach(function(item) {
      if(!tile.chips.includes(item)){
        accept = false;
        return;
      }
    })
    return accept;
  }

  ngOnInit() {
  }

}
