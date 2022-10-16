import { Component, OnInit } from '@angular/core';
import { ComicService } from '../Services/comic.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private comicService: ComicService) {}

  totalFavorites: number;

  ngOnInit(): void {}
  getTotalFavorites() {
    this.totalFavorites = this.comicService.allComicFavorites.length;
    return this.totalFavorites;
  }
}
