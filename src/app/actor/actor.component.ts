import { Component } from '@angular/core';
import { Buoy } from 'ngx-buoy';
import gql from 'graphql-tag';
import {QueryOptions} from "ngx-buoy/lib/wrappers/options";
@Component({
    templateUrl: './actor.component.html'
})
export class ActorComponent  {

    public bestRatedMovies;
    public latestAddedMovies;

    constructor(
        private buoy: Buoy
    ) {
        this.bestRatedMovies = this.buoy.query(
            gql `
            query BestRatedMovies {
                movies(count: 5) {
                    data {
                        title
                        poster

                        roles(count: 5) {
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
            {

            },
            <QueryOptions> {
                scope: 'movies.data'
            }
        );


        this.latestAddedMovies = this.buoy.query(
            gql `
            query BestRatedMovies {
                movies(count: 5) {
                    data {
                        title
                        poster

                        roles(count: 5) {
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
            {

            },
            <QueryOptions> {
                scope: 'movies.data'
            }
        );

    }
}
