import { Component, OnInit } from '@angular/core';
import { MoviesService} from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any = [];
  activeMovie;
  editingMovie;
  editing: boolean = false;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies.movies;
    });
  }

  selectMovie(movie) {
    this.editing = false;
    this.editingMovie = null;
    this.activeMovie = movie;
    console.log(this.activeMovie);
  }

  editMovie() {
    this.editingMovie = this.activeMovie;
    this.editing = true;
  }

  saveMovie(movie) {
    if (!Array.isArray(movie.genre)) {
      movie.genre = movie.genre.split(',');
    };
    this.moviesService.saveMovie(movie).subscribe(movies => {
      this.editing = false;
      this.editingMovie = null;
      this.movies = movies;
    });
  }

}
