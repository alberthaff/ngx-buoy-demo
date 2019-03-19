import { Component, OnDestroy } from '@angular/core';
import gql from 'graphql-tag';
import { Buoy, Query } from '@buoy/client';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
    templateUrl: './actor.component.html'
})
export class ActorComponent implements OnDestroy {

    public actor: Query;
    private routeSubscription: Subscription;

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
            {},
            {
                scope: 'actor'
            }
        );

        this.routeSubscription = this._route.params.subscribe((queryParams) => {
            this.actor.setVariable('id', queryParams.actorId).refetch();
        });

    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}
