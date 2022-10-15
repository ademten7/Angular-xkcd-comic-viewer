import { Component, OnInit } from '@angular/core';
import { ComicService } from '../Services/comic.service';
import { Comic } from '../model/comic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private comicService: ComicService) {}
  comic: Comic;
  comicNumber: number;
  lastComicId: number;
  warning: string = '';
  favoritesWarning: string = '';
  favorites: Comic[] = [];

  ngOnInit(): void {
    this.fetchComics();
    this.getComicsById(this.comicNumber);
  }

  fetchComics() {
    this.comicService.getComics().subscribe((res: any) => {
      this.comic = res;
      this.lastComicId = res.num;
      this.comicNumber = res.num;
      console.log(this.lastComicId);
    });
  }

  getComicsById(id: number) {
    this.favoritesWarning = '';
    this.comicService.getComicsByNumber(id).subscribe((res: any) => {
      this.comic = res;
      //console.log(res);
    });
  }

  getFirstComic(number: number) {
    this.favoritesWarning = '';
    this.comicNumber = number;
    this.comicService.getComicsByNumber(number).subscribe((res: any) => {
      this.comic = res;
      this.warning = '';
    });
  }

  getLastComic() {
    this.comicService.getComics().subscribe((res: any) => {
      this.favoritesWarning = '';
      this.comic = res;
      console.log(res);
      this.comicNumber = res.num;
      this.warning = '';
    });
  }

  getPreviousComic(number: number) {
    this.favoritesWarning = '';
    if (this.comicNumber !== null && this.comicNumber > 1) {
      number = this.comicNumber - 1;
      this.comicNumber = number;
      this.comicService.getComicsByNumber(number).subscribe((res: any) => {
        this.comic = res;

        this.warning = '';
      });
    } else {
      this.warning = 'Sorry, this is the first comic!!!';
    }
  }

  getNextComic(number: number) {
    this.favoritesWarning = '';
    if (this.comicNumber !== null && this.comicNumber !== this.lastComicId) {
      number = this.comicNumber + 1;
      this.comicNumber = number;
      this.comicService.getComicsByNumber(number).subscribe((res: any) => {
        this.comic = res;
      });
      this.warning = '';
    } else {
      this.warning = 'Sorry, this is the last comic!!!';
    }
  }
  getComicsByRandomNumber() {
    this.favoritesWarning = '';
    let randomNumber = Math.floor(Math.random() * this.lastComicId) + 1;
    console.log(randomNumber);
    this.comicService.getComicsByNumber(randomNumber).subscribe((res: any) => {
      this.comic = res;
      this.comicNumber = randomNumber;
    });
    this.warning = '';
  }

  addFavorites(comic: Comic) {
    let newComic = this.comicService.allComicFavorites.find(
      (item) => item.num === comic.num
    );
    if (!newComic) {
      this.comicService.allComicFavorites.push(comic);
      console.log(this.comicService.allComicFavorites);
      this.favoritesWarning = '';
    } else {
      this.favoritesWarning =
        'This comic have already added in the favorite list';
    }
  }
}
