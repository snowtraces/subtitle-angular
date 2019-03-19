import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Movie} from '../entity/movie';
import {MovieService} from '../service/movie.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  movies$: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private movieService: MovieService,
    private router: Router,
  ) {
  }

  /**
   * 关键词提示
   */
  searchTerm(term: string): void {
    this.searchTerms.next(term.trim());
  }

  /**
   * 点击搜索
   */
  search(term: string): void {
    if (!term.trim()) {
      return;
    }
    this.router.navigate(['/movies', {term}]);
  }

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchMovies(term)),
    );
  }
}
