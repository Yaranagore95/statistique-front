import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name: string;
  searchText = '';
  // tslint:disable-next-line:variable-name
  selected_count = 0;


  // Data Object to List Games
  games = [
    {
      name: 'Chess',
      id: 1,
      selected: true
    },
    {
      name: 'Ludo',
      id: 2,
      selected: false
    },
    {
      name: 'Snakes & Ladders',
      id: 3,
      selected: false
    },
    {
      name: 'Carrom',
      id: 4,
      selected: false
    },
    {
      name: 'Scrabble',
      id: 5,
      selected: false
    },
    {
      name: 'Monopoly',
      id: 6,
      selected: true
    },
    {
      name: 'Uno',
      id: 7,
      selected: false
    }
  ];
  // tslint:disable-next-line:variable-name
  private selected_games: { name: string; id: number; selected: boolean }[];
  ngOnInit(): void {
  }
  // Getting Selected Games and Count
  getSelected() {
    this.selected_games = this.games.filter(s => {
      return s.selected;
    });
    this.selected_count = this.selected_games.length;
    // alert(this.selected_games);
  }

  // Clearing All Selections
  clearSelection() {
    this.searchText = '';
    this.games = this.games.filter(g => {
      g.selected = false;
      return true;
    });
    this.getSelected();
  }

  // Delete Single Listed Game Tag
  deleteGame(id: number) {
    this.searchText = '';
    this.games = this.games.filter(g => {
      if (g.id === id) {
        g.selected = false;
      }

      return true;
    });
    this.getSelected();
  }

  // Clear term types by user
  clearFilter() {
    this.searchText = '';
  }
}
