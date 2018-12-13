import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material';
import { DataSource, CdkTableModule} from '@angular/cdk/table';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ScoresService } from './scores.service';
import { EmployeeScoreElement } from './scores.model';
import { Observable } from 'rxjs';
import { groupBy } from 'rxjs/internal/operators/groupBy';

const ELEMENT_DATA: EmployeeScoreElement[] = [
    {position: 1, name: "Sultans of Swing", score: 5, comment: ""},
    {position: 1, name: "This Puts for You", score: 7, comment: "I'm second"},
    {position: 1, name: "Fairway to Heaven", score: 9, comment: ""},
    {position: 1, name: "Weapons of Grass Destruction", score: 5, comment: ""}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  displayedColumns: string[] = ['position', 'name', 'score', 'bonus'];
  dataSource: MatTableDataSource<EmployeeScoreElement>;
  scores: EmployeeScoreElement[] = [];
  worstScore: EmployeeScoreElement;
  groupByScore = new Map();

  constructor(private scoreService: ScoresService) {
    scoreService.getScoreData().subscribe(res => {
        this.scores.push(...res.json());
        this.scores.sort((a, b) => {
            return a.score - b.score;
        });
        this.scores.forEach((scoreElement: EmployeeScoreElement, index) => {
            if (index !== 0) {
                let previousElement: EmployeeScoreElement = this.scores[index-1];
                previousElement.score === scoreElement.score ?
                    scoreElement.position = previousElement.position :
                    scoreElement.position = index + 1;
            } else {
                scoreElement.position = 1;
            }
        });
        this.worstScore = this.scores.pop();
        // this.worstScore = this.groupByScore.get(this.worstScore.score);
        // this.groupByScore.delete(this.worstScore.score);
        this.dataSource = new MatTableDataSource(this.scores);
    });
  }

  getWorstScore() {
    return this.worstScore ? this.worstScore.score : null;
  }

  getWorstScoreName() {
    return this.worstScore ? this.worstScore.name : null;
  }

  getWorstScorePosition() {
    return this.worstScore ? this.worstScore.position : null;
  }

  //var csv is the CSV file with headers
  csvJSON(csv) {

      var lines=csv.split("\n");

      var result = [];

      var headers=lines[0].split(",");

      for(var i=1;i<lines.length;i++){

          var obj = {};
          var currentline=lines[i].split(",");

          for(var j=0;j<headers.length;j++){
              obj[headers[j]] = currentline[j];
          }

          result.push(obj);

      }

      //return result; //JavaScript object
      return JSON.stringify(result); //JSON
    }
}
