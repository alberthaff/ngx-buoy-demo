import { Component } from '@angular/core';
import { Buoy, Query } from '@buoy/client';
import gql from 'graphql-tag';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent  {

    public movies: Query;

    constructor(
        private buoy: Buoy,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.movies = this.buoy.query(
            gql `
            query Movies($page: Int!, $limit: Int!) {
                movies(page: $page, count: $limit) {
                    data {
                        id
                        title
                        poster

                        roles(count: 4) {
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
            }
            `,
            {},
            {
                router: {
                    route: this.route,
                    router: this.router
                },
                pagination: 'movies',
                scope: 'movies.data'
            }
        );

    }
}
