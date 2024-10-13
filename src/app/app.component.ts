import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { CardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tankstelle_koeln';

  showStreet = true;
  ascending = true;
  letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  searchText: string = '';
  selectedLetter: string | null = null;

  constructor(public data: DataService) {}

  ngOnInit() {
    this.data.fetchDataJson();
  }


  backToAllStations() {
    this.data.stations = this.data.sortStations(this.data.stationsAll, this.showStreet ? 'street' : 'district', this.ascending);
    this.data.searchedStations = [];
    this.searchText = '';
    this.selectedLetter = null;
  }


  onSearch() {
    this.data.searchStations(this.searchText, this.showStreet ? 'street' : 'district', this.ascending);
    this.selectedLetter = null;
  }


  selectLetter(letter: string) {
    this.selectedLetter = letter;
  }


}
