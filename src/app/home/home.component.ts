import { Component, OnInit } from '@angular/core';
import { ComicService } from '../Services/comic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private comicService: ComicService) {}

  ngOnInit(): void {
    this.fetchComics();
  }

  private fetchComics() {
    this.comicService.fetchComics();
  }
}
