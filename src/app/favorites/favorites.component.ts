import { Component, OnInit } from '@angular/core';
import { Comic } from '../model/comic';
import { ComicService } from '../Services/comic.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  allComics: Comic[] = [];

  constructor(private comicService: ComicService) {}

  ngOnInit(): void {
    this.allComics = this.comicService.allComicFavorites;
  }

  removeComic(id: number) {
    const newAllComics = this.allComics.filter(
      (comic: Comic) => comic.num !== id
    );
    this.comicService.allComicFavorites = newAllComics;
    this.allComics = newAllComics;
  }
}
