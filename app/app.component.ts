import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface IPerson { name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'angular-todo';

  public people: IPerson[] = [];

  constructor(private http: HttpClient) { }

  //test:string="test";

  ngOnInit() {
    this.fetchPeople();
  }

  getTodo() {

  }

  private async fetchPeople() {
    console.log(this.people);

    const test = await this.http.get<IPerson[]>("http://localhost:8080/api/people").toPromise();
    this.people = test;  }

}


