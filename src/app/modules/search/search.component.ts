import { Component, OnInit, Input } from '@angular/core';
 import { Router, ActivatedRoute } from '@angular/router';
import { TrackService } from '../track.service';
import { Track } from '../track';
import { MatSnackBar } from '@angular/material';

 @Component({
   selector: 'app-search',
   templateUrl: './search.component.html',
   styleUrls: ['./search.component.scss']
 })
 export class SearchComponent implements OnInit {

  @Input() searchTrack: string;
  private tracks: Array<Track>;
  private statusCode: number;
  private errorStatus: string;

  constructor(private trackService: TrackService, private snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.tracks = [];
  }

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      this.searchTrack = data.search;
      console.log(this.searchTrack);
      if (this.searchTrack !== undefined && this.searchTrack !== '' && this.searchTrack.replace(' ', '').length > 0) {
        console.log('Search Track');
        this.trackService.serachTrackFM(this.searchTrack, 10).subscribe((res: any) => {
          this.tracks = [];
          this.tracks = res;
        });
      } else {
        console.log('Top 20 Track');
        this.trackService.getTopTracksFromLastFM('india', 20).subscribe((res: any) => {
          this.tracks = [];
          this.tracks = res;
          });
      }
    });
  }

  addToPlayList(track) {
    this.trackService.addToPlayList(track).subscribe(
      response => {
        this.statusCode = response.status;
        if (this.statusCode === 200) {
          console.log('Success', this.statusCode);
          this.snackBar.open('Track Successfully added !!!', '', {
            duration: 1500
          });
        }
      },
      err => {
        const errorStatus = err;
        this.statusCode = parseInt(errorStatus, 10);
        if (this.statusCode === 409) {
          this.snackBar.open('Track already added', '', {
            duration: 1500
          });
          this.statusCode = 0;
        }
    });
  }

  find(trackName: string) {
    console.log(trackName);
  }

 }







// // import { ActivatedRoute } from '@angular/router';
// // import { Component, OnInit } from '@angular/core';
// // // import { SearchService } from 'src/app/modules/search.service';
// // // import { TrackService } from 'src/app/modules/track.service';

// // @Component({
// //   selector: 'app-search',
// //   templateUrl: './search.component.html',
// //   styleUrls: ['./search.component.css']
// // })
// // export class SearchComponent implements OnInit {
// //    trackname ;
// //   trackName: any;
// //   alltracks: any;
// //   tracks: any;
// //   button = 'save to wishlist';

// //   public artist: string;
// //   public track: string;
// //   public mbidnew: any;
// //   public url: any;
// //   public track1 = {
// //      trackId: this.mbidnew,
// //      trackName: this.track,
// //       trackComments: this.artist,
// //       trackUrl: this.url
// //   };
// //   constructor(private route: ActivatedRoute, private searchService: SearchService, private trackService: TrackService) { }
// //     ngOnInit() {
// //     this.trackName = this.route.snapshot.paramMap.get('value');
// //     this.tracks =  this.searchService.getTrackByName(this.trackName).subscribe((data) => this.alltracks = (data));
// //     }
// //     savetrack(mbid) {
// //       console.log('this is working');
// //       this.searchService.getTrackInfo(mbid).subscribe(data => {
// //         this.track1.trackId = mbid;
// //         this.track1.trackName = data['track']['name'];
// //         this.track1.trackComments = data['track']['artist']['name'];
// //         // tslint:disable-next-line:quotemark
// //         this.track1.trackUrl = data['track'].album.image[3]['#text'];
// //         this.trackService.addTrack(this.track1).subscribe(data1 => console.log(data1));
// //         this.button = 'saved to wishlist';
// //       });
// // }
// // }






























// // // import { SearchService } from 'src/app/search.service';
// // // import { HttpClient } from '@angular/common/http';
// // // import { Component, OnInit } from '@angular/core';
// // // import { ActivatedRoute } from '@angular/router';

// // // @Component({
// // //   selector: 'app-search',
// // //   templateUrl: './search.component.html',
// // //   styleUrls: ['./search.component.scss']
// // // })
// // // export class SearchComponent implements OnInit {
// // //   trackName: any;
// // //   alltracks: any;
// // //   tracks: any;
// // //   button = 'save to wishlist';

// // //   public artist: string;
// // //   public track: string;
// // //   public mbidnew: any;
// // //   public url: any;
// // //   public track1 = {
// // //      trackId: this.mbidnew,
// // //      trackName: this.track,
// // //       trackComments: this.artist,
// // //       trackUrl: this.url
// // //   };
// // //   constructor(private route: ActivatedRoute, private searchService: SearchService, private trackService: TrackService) { }
// // //     ngOnInit() {
// // //     this.trackName = this.route.snapshot.paramMap.get('value');
// // //     this.tracks =  this.searchService.getTrackByName(this.trackName).subscribe((data) => this.alltracks = (data));
// // //     }
// // //     savetrack(mbid) {
// // //       console.log('this is working');
// // //       this.searchService.getTrackInfo(mbid).subscribe(data => {
// // //         this.track1.trackId = mbid;
// // //         this.track1.trackName = data['track']['name'];
// // //         this.track1.trackComments = data['track']['artist']['name'];
// // //         // tslint:disable-next-line:quotemark
// // //         this.track1.trackUrl = data['track'].album.image[3]['#text'];
// // //         this.trackService.addTrack(this.track1).subscribe(data1 => console.log(data1));
// // //         this.button = 'saved to wishlist';
// // //       });
// // // }

// // // }
