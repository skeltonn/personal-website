import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  title: string;
  image: string;
  chips: Array<string>;
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
    {title: 'Swatched', text: 'One', cols: 1, rows: 1, color: 'lightblue', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg', chips: ["Android", "Java", "Material"]},
    {title: 'Pattonville App', text: 'Three', cols: 1, rows: 1, color: 'lightpink', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg', chips: ["Android", "Java", "Material"]},
    {title: 'Flood++', text: 'Two', cols: 2, rows: 2, color: 'lightgreen', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg', chips: ["Android", "Java", "Material"]},
    {title: 'Garden', text: 'Four', cols: 1, rows: 1, color: 'lightyellow', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg', chips: ["Python", "Raspberry Pi"]},
    {title: 'Rover Engagement Display', text: 'Four', cols: 1, rows: 1, color: 'lightyellow', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg', chips: ["C#", "WPF"]},
    {title: 'Rover Autonomy', text: 'Four', cols: 1, rows: 1, color: 'lightyellow', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg', chips: ["Python", "OpenCV"]},
    {title: 'Personal Website', text: 'Four', cols: 1, rows: 1, color: 'lightyellow', image: 'https://material.angular.io/assets/img/examples/shiba2.jpg', chips: ["Angular", "Material"]}
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
