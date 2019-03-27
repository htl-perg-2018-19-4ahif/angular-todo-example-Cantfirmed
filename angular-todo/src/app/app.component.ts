import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface IPerson { name: string; }
interface ITodoItem {
  id?: number;
  assignedTo?: string;
  description: string;
  done?: boolean;
}

interface IDialogData {
  todo: ITodoItem;
  people: IPerson[];
}

enum STATUS {
  ALL = 'all',
  DONE = 'done',
  NOT_DONE = 'not_done'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Todo-Liste';
  public selectedPerson: string = "Nobody";
  public description: string = "";
  public status: boolean = false;

  public people: IPerson[] = [];
  public todos: ITodoItem[] = [];

  //Filter
  public onlyUndone: boolean = false;
  public filterPerson: IPerson;

  constructor(private http: HttpClient) { }

  //test:string="test";

  ngOnInit() {
    this.fetchPeople();
    this.fetchTodos();
  }

  getTodo() {

  }
  //this.description, this.selectedPerson.name

  private async fetchPeople() {
    this.people = await this.http.get<IPerson[]>("http://localhost:8080/api/people").toPromise();
  }
  private async fetchTodos() {
    this.todos = await this.http.get<ITodoItem[]>("http://localhost:8080/api/todos").toPromise();
  }
  public async addTodo() {

    let todo: ITodoItem = { description: this.description, assignedTo: this.selectedPerson, done: this.status };
    this.todos.push(todo);
    await this.http.post<ITodoItem>("http://localhost:8080/api/todos", todo).toPromise();

  }


}


