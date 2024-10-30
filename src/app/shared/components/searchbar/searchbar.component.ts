import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  @Output() public search = new EventEmitter<string>();
  public searchTerm = '';
  public toggleSearch = false;

  public openSearchbar(): void {
    this.toggleSearch = true;
  }

  public closeSearchbar(): void {
    this.searchTerm = '';
    this.toggleSearch = false;
  }

  public onSearch(): void {
    const term = this.searchTerm.trim();
    if (term) this.search.emit(term);
  }
}
