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
            query BestRatedMovies($id: Int!) {
                movie(id: $id) {
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
                id: null
            },
            <QueryOptions> {
                scope: 'movie'
            }
        );

        this._route.params.subscribe((queryParams) => {
            this.movie.setVariable('id', queryParams.movieId).refetch();
        });
    }
}
