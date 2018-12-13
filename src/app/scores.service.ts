import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { EmployeeScoreElement } from './scores.model';
import { Observable } from 'rxjs';

@Injectable()
export class ScoresService {
    constructor(public http: Http) {}

    getScoreData() {
        let url = 'http://docs.google.com/spreadsheets/d/1DvbVA5iAjfRcFdeIrqhFUiKo3xdD05HxkauJ7ycDeE0/export?format=csv&id=1DvbVA5iAjfRcFdeIrqhFUiKo3xdD05HxkauJ7ycDeE0&gid=1155531279'
        // return this.http.get(url);
        return this.http.get('./assets/example.json');
    }
}