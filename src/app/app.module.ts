import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {Buoy, BuoyModule, LighthouseLink, LighthouseLinkOptions} from 'ngx-buoy';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import {environment} from '../environments/environment';
import {MovieListComponent} from './partials/movie-list.component';
import {PaginatorComponent} from './partials/paginator.component';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {CommonModule} from '@angular/common';
import {ActorComponent} from './actor/actor.component';
import {MovieComponent} from './movie/movie.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ActorComponent,
        MovieComponent,
        MovieListComponent,
        PaginatorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        FormsModule,
        BuoyModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private apollo: Apollo,
        private buoy: Buoy,
        private http: HttpClient
    ) {
        const link = new LighthouseLink(
            this.http,
            <LighthouseLinkOptions>{
                uri: environment.graphUri,
                httpMode: 'json',
                headers: () => {
                    console.log('GENERATING HEADERS FOR REQUEST');
                    return new HttpHeaders()
                        .set('Authorization', 'Bearer ' + localStorage.getItem('token') || null);
                },
                subscriptions: {
                    driver: 'pusher'
                }
            }
        );

        this.apollo.create({
            link: link,
            cache: new InMemoryCache()
        });
    }
}
