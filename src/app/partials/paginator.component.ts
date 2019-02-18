import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html'
})
export class PaginatorComponent  {
    @Input('query') query;
}
