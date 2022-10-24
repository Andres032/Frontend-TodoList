import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createTask, Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string ;
  createTask : string;
  deleteUrl : string;
  updateTask : string;

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:3000/api/v1/task/all",
    this.createTask = "http://localhost:3000/api/v1/task/create",
    this.deleteUrl =  "http://localhost:3000/api/v1/task/",
    this.updateTask = "http://localhost:3000/api/v1/task/update-task/"
  }

  addTask(task : any) : Observable<any> {
    return this.http.post<Task>(this.createTask, task);
  }

  getAllTask() : Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }

  deleteTask(id: string) : Observable<Task> {
    return this.http.delete<Task>(this.deleteUrl+id);
  }

  editTask(id : string, task : any) : Observable<any> {
    return this.http.put<Task>(`${this.updateTask}${id}`, task);
  }

}
