import { Component, OnDestroy } from '@angular/core';
import { Buoy, Query } from '@buoy/client';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
    templateUrl: './movie.component.html'
})
export class MovieComponent implements OnDestroy {

    public movie: Query;
    private routeSubscription: Subscription;

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
            {
                scope: 'movie'
            }
        );

        this.routeSubscription = this._route.params.subscribe((queryParams) => {
            this.movie.setVariable('id', queryParams.movieId).refetch();
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}
