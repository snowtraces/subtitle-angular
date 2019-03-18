import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Movie} from '../entity/movie';
import {MovieService} from '../service/movie.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  movies$: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private movieService: MovieService
  ) {
  }

  search(term: string): void {
    this.searchTerms.next(term.trim());
  }

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchMovies(term)),
    );
  }
}
