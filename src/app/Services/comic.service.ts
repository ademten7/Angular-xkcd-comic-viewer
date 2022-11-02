import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Comic } from '../model/comic';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private http: HttpClient) {}

  allComicFavorites: Comic[] = [];

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  getComics() {
    let header = new HttpHeaders();
    header = header.append('Access-Control-Allow-Origin', '*');
    header = header.append('Content-Type', 'application/json');
    header = header.append(
      'Access-Control-Allow-Methods',
      'GET, PUT, DELETE ,POST'
    );
    header = header.append('Access-Control-Allow-Credentials', 'true');

    return this.http
      .get(
        'https://the-ultimate-api-challenge.herokuapp.com/https://xkcd.com/info.0.json',
        {
          headers: header,
        }
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getComicsByNumber(id: number) {
    let header = new HttpHeaders();
    header = header.append('Access-Control-Allow-Origin', '*');
    header = header.append('Content-Type', 'application/json');
    header = header.append(
      'Access-Control-Allow-Methods',
      'GET, PUT, DELETE ,POST'
    );
    header = header.append('Access-Control-Allow-Credentials', 'true');

    return this.http
      .get(
        'https://the-ultimate-api-challenge.herokuapp.com/https://xkcd.com/' +
          id.toString() +
          '/info.0.json',
        {
          headers: header,
        }
      )
      .pipe(retry(3), catchError(this.handleError));
  }
}
