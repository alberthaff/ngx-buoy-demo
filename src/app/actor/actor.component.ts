import { Component } from '@angular/core';
import { Buoy } from 'ngx-buoy';
import gql from 'graphql-tag';
import {QueryOptions} from "ngx-buoy/lib/wrappers/options";
import {ActivatedRoute} from "@angular/router";
@Component({
    templateUrl: './actor.component.html'
})
export class ActorComponent  {

    public actor;

    constructor(
        private buoy: Buoy,
        private _route: ActivatedRoute
    ) {
        this.actor = this.buoy.query(
            gql `
            query Actor($id: Int!) {
                actor(id: $id) {
                    name
                    profile
                    roles(count: 100) {
                        data {
                            character
                            movie {
                                id
                                title
                                poster
                            }
                        }
                    }
                }
            }
            `,
            {

            },
            <QueryOptions> {
                scope: 'actor'
            }
        );

        this._route.params.subscribe((queryParams) => {
            this.actor.setVariable('id', queryParams.actorId).refetch();
        });

    }
}
