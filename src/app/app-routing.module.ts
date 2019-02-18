import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ActorComponent} from './actor/actor.component';
import {MovieComponent} from './movie/movie.component';

const routes: Routes = [
    {path: '',  component: HomeComponent},
    {path: 'actors/:actorId',  component: ActorComponent},
    {path: 'movies/:movieId',  component: MovieComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
