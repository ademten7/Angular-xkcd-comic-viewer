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

  ngOnInit(): void {
    this.fetchComics();
  }

  private fetchComics() {
    this.comicService.fetchComics().subscribe((res: any) => {
      this.comic = res;
      console.log(this.comic);
    });
  }
}
