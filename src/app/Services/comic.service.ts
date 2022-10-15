import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private http: HttpClient) {}
  /*
  comics = [
    {
      num: 2685,
      alt: '"Sorry, doctor, I\'m going to have to come in on a different day--I have another appointment that would be really hard to move, in terms of the kinetic energy requirements."',
      img: 'https://imgs.xkcd.com/comics/2045.png',
      title: '2045',
    },
  ];
  */

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
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

  getLastComic() {
    //const header = new HttpHeaders()
    //.set('Access-Control-Allow-Origin', '*')
    //.set('Content-Type', 'application/json')
    //.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE ,POST')
    //.set('Access-Control-Allow-Credentials', 'true')
    // .set('Access-Control-Allow-Headers', 'Content-Type');

    let header = new HttpHeaders();
    header = header.append('Access-Control-Allow-Origin', '*');
    header = header.append('Content-Type', 'application/json');
    header = header.append(
      'Access-Control-Allow-Methods',
      'GET, PUT, DELETE ,POST'
    );
    header = header.append('Access-Control-Allow-Credentials', 'true');
    header = header.append('Access-Control-Allow-Headers', 'Content-Type');

    return this.http
      .get(
        'https://the-ultimate-api-challenge.herokuapp.com/https://xkcd.com/info.0.json',
        {
          headers: header,
        }
      )
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
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
    header = header.append('Access-Control-Allow-Headers', 'Content-Type');

    return this.http
      .get(
        'https://the-ultimate-api-challenge.herokuapp.com/https://xkcd.com/' +
          id.toString() +
          '/info.0.json',
        {
          headers: header,
        }
      )
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
}
