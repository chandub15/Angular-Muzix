import { Injectable } from '@angular/core';
import { Track } from './track';
import { Image } from './image';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
        providedIn: 'root'
    })
export class TrackService {
  private lastFmGetTopTracksUrl: string;
  private lastFmSearchTrackUrl: string;
  private country: string;
  private apiKey: string;
  private format: string;
  private limit: string;

  private  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private  microServiceUrl: string;

  private track: Track;
  private tracks: Array<Track>;
  private tracksSubject: BehaviorSubject<Track[]>;

  private errorMsg: string;
  private errorStatus: string;
  private errorBody: string;

  constructor(private http: HttpClient) {
    this.lastFmGetTopTracksUrl = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks';
    this.lastFmSearchTrackUrl = 'http://ws.audioscrobbler.com/2.0/?method=track.search';
    this.country = '&country=';
    this.apiKey = '&api_key=c68197638acfba27f52a741e2e288119';
    this.format = '&format=json';
    this.limit = '&limit=';
    this.microServiceUrl = 'http://localhost:8082/api/v1/';
  }

  getTopTracksFromLastFM(country: string, limit: number) {
    const url = this.lastFmGetTopTracksUrl + this.country + country + this.apiKey + this.format + this.limit + limit;
    this.tracks = [];
    this.tracksSubject = new BehaviorSubject(this.tracks);
    this.http.get(url).subscribe(response => {
      console.log(response);
      const trackList = response['tracks']['track'];
      trackList.forEach( data => {
        this.track = new Track();
        const tName = '' + data.name;
        const sName = '' + data.artist.name;
        this.track.trackId = tName.replace(' ', '_') + '_' + sName.replace(' ' , '_');
        this.track.trackName = data.name;
        this.track.url = data.url;
        this.track.trackSinger = data.artist.name;
        this.track.trackImageUrl = data.image[3]['#text'];
        this.track.comment = '';

        this.tracks.push(this.track);
      });
      // console.log(this.tracks);
      this.tracksSubject.next(this.tracks);
    });
    return this.tracksSubject;
  }

  addToPlayList(track: Track) {
    console.log(track);
    return this.http
    .post(this.microServiceUrl + 'tracks/track', track, { observe: 'response' })
    .pipe(catchError(this.handleError));
  }

  getAddedTracks() {
    console.log('Added Tracks');
    return this.http.get(this.microServiceUrl + 'tracks', { observe: 'response' })
    .pipe(catchError(this.handleError));
  }

  searchAddedTracks(trackName: string) {
    return this.http.get(this.microServiceUrl + 'tracks/' + trackName, { observe: 'response' })
    .pipe(catchError(this.handleError));
  }

  updateAddedTrack(track: Track) {
    return this.http
    .put(this.microServiceUrl + 'tracks/track', track, { observe: 'response' })
    .pipe(catchError(this.handleError));
  }

  deleteTrackFromPlayList(trackId: string) {
    console.log(this.microServiceUrl + 'tracks/track/' + trackId);
    return this.http.delete(this.microServiceUrl + 'tracks/track/' + trackId, { observe: 'response' })
    .pipe(catchError(this.handleError));
  }

  serachTrackFM(trackName: string, limit: number) {
    const url = this.lastFmSearchTrackUrl + this.apiKey + this.format + this.limit + limit + '&track=' + trackName;
    this.tracks = [];
    this.tracksSubject = new BehaviorSubject(this.tracks);
    this.http.get(url).subscribe(response => {
      // console.log(response);
      const trackList = response['results']['trackmatches']['track'];
      console.log(trackList);
      trackList.forEach( data => {
        this.track = new Track();
        const tName = '' + data.name;
        const sName = '' + data.artist.name;
        this.track.trackId = tName.replace(' ', '_') + '_' + sName.replace(' ' , '_');
        this.track.trackName = data.name;
        this.track.url = data.url;
        this.track.trackSinger = data.artist.name;
        this.track.trackImageUrl = data.image[3]['#text'];
        this.track.comment = '';

        this.tracks.push(this.track);
      });
      // console.log(this.tracks);
      this.tracksSubject.next(this.tracks);
    });
    return this.tracksSubject;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occured :', error.error.message);
    } else {
      this.errorStatus = `${error.status}`;
      console.log('Error msg', this.errorStatus);
      this.errorBody = `${error.error}`;
      console.log(
        `Backened returned code ${error.status},` + `body was :${error.error}`
      );
    }

    return throwError(this.errorStatus);
  }
}







































































