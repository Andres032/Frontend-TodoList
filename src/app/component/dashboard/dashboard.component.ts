import { Component, OnInit } from '@angular/core';
import { createTask, Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();

  }

  getAllTask() {
    this.crudService.getAllTask().subscribe((data: any) => {
      console.log(data.data);
      this.taskArr = data.data;
      
    }, err => {
      alert("Unable to get list of tasks");
    });
  }

  addTask(task: any) {
    const { tittle, description, author } = task 
    const newTask = {
      tittle: tittle,
      description: description,
      author: author
    };
 
    this.crudService.addTask(newTask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to update task");
    })
  }

  editTask() {
    this.taskObj.tittle = this.editTaskValue;
    this.taskObj.description= this.addTaskValue;
    this.taskObj.author= this.addTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to update task");
    })
  }

  deleteTask(id : string) {
    this.crudService.deleteTask(id).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to delete task");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.tittle;
    this.editTaskValue = etask.description;
    this.editTaskValue = etask.author;
  }


}
