import { Component } from '@angular/core';
import { Buoy } from 'ngx-buoy';
import gql from 'graphql-tag';
import {QueryOptions} from "ngx-buoy/lib/wrappers/options";
import {ActivatedRoute} from "@angular/router";
@Component({
    templateUrl: './movie.component.html'
})
export class MovieComponent  {

    public movie;
    private movieId;

    constructor(
        private buoy: Buoy,
        private _route: ActivatedRoute
    ) {
        this.movie = this.buoy.query(
            gql `
            query BestRatedMovies {
                movie(id: 1) {
                    title
                    poster
                    overview
                    release_date
                    roles(count: 100) {
                        data {
                          character
                          actor {
                            id
                            name
                            profile
                          }
                        }
                        paginatorInfo {
                          total
                        }
                      }
                }
            }
          `,
            {
                id: this.movieId
            },
            <QueryOptions> {
                scope: 'movie'
            }
        );

        this._route.params.subscribe((queryParams) => {
            this.movieId = queryParams.movieId;
            this.movie.refetch();
        });
    }
}
