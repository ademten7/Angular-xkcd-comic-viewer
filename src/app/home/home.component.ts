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

  ngOnInit(): void {
    this.fetchComics();
    this.getComicsById(this.comicNumber);
  }

  fetchComics() {
    this.comicService.getLastComic().subscribe((res: any) => {
      this.comic = res;
      this.lastComicId = res.num;
      this.comicNumber = res.num;
      console.log(this.lastComicId);
    });
  }

  getComicsById(id: number) {
    this.comicService.getComicsByNumber(id).subscribe((res: any) => {
      this.comic = res;
      //console.log(res);
    });
  }

  getFirstComic(number: number) {
    this.comicNumber = number;
    this.comicService.getComicsByNumber(number).subscribe((res: any) => {
      this.comic = res;
      this.warning = '';
    });
  }

  getLastComic() {
    this.comicService.getLastComic().subscribe((res: any) => {
      this.comic = res;
      console.log(res);
      this.comicNumber = res.num;
      this.warning = '';
    });
  }

  getPreviousComic(number: number) {
    if (this.comicNumber !== null) {
      number = this.comicNumber - 1;
      this.comicNumber = number;
      this.comicService.getComicsByNumber(number).subscribe((res: any) => {
        this.comic = res;
        this.warning = '';
      });
    }
  }

  getNextComic(number: number) {
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
}
