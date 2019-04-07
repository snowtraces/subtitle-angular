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
  private status = true;

  constructor(
    private movieService: MovieService,
    private router: Router,
  ) {
  }

  /**
   * 关键词提示
   */
  searchTerm(term: string): void {
    console.log(this.status)
    if (this.status) {
      this.searchTerms.next(term.trim());
    }
  }

  updateInputStatus(status: boolean, term: string): void {
    this.status = status;
    if (this.status) { // compositionend 事件
      this.searchTerms.next(term.trim());
    }
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
