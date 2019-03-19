import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { MovieListComponent } from './partials/movie-list.component';
import { PaginatorComponent } from './partials/paginator.component';
import { CommonModule } from '@angular/common';
import { ActorComponent } from './actor/actor.component';
import { MovieComponent } from './movie/movie.component';
import { BuoyConfig, BuoyModule } from '@buoy/client';
import { environment } from '../environments/environment';

const buoyConfig: BuoyConfig = {
    uri: environment.graphUri
};

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
        BuoyModule
    ],
    providers: [
        { provide: BuoyConfig, useValue: buoyConfig }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() { }
}
