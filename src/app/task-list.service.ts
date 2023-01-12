import { Injectable } from "@angular/core";
import { Task } from "./task";
import { Router } from "@angular/router";
import { Project } from "./shared/task/project.model";
import { PostsService } from "./posts.service";
import { Observable, Subject } from "rxjs";
import { TaskModel } from "./shared/task/task.model";

@Injectable({
  providedIn: "root",
})
export class TaskListService {
  constructor(private router: Router, private postService: PostsService) {}

  testValue;

  taskEdited = new Subject<Task>();

  taskList = [];
  togglePriority(task: Task) {
    task.priority = task.priority ? false : true;
    this.taskEdited.next(task);
  }

  onTaskEdit(taskToEdit, newTask) {
    const taskID = this.taskList.indexOf(taskToEdit);
    this.taskList[taskID].name = newTask.name;
    this.taskList[taskID].description = newTask.description;
    this.taskList[taskID].date = newTask.date;
    this.taskList[taskID].priority = newTask.priority;
    this.taskEdited.next(this.taskList[taskID]);
  }

  getTasks(taskType) {
    switch (taskType) {
      case "all":
        return { name: "All tasks", taskList: this.taskList };
      case "important":
        const importantTasks = this.taskList.filter(
          (task) => task.priority == true
        );
        return { name: "Important", taskList: importantTasks };
      case "today":
        const date = new Date().toISOString().slice(0, 10);
        const todayTasks = this.taskList.filter((task) => task.date == date);
        return { name: "Today", taskList: todayTasks };

      case "weekly":
        let today: any = new Date();
        let nextWeek: any = new Date();
        nextWeek.setDate(today.getDate() + 7);
        today = today.toISOString().slice(0, 10);
        nextWeek = nextWeek.toISOString().slice(0, 10);
        const weekTasks = this.taskList.filter(
          (task) =>
            Date.parse(task.date) >= Date.parse(today) &&
            Date.parse(task.date) <= Date.parse(nextWeek)
        );
        return { name: "Nex 7 Days", taskList: weekTasks };
      default:
        this.router.navigate(["/not-found"]);
    }
  }

  deleteTask(task) {
    const taskID = this.taskList.indexOf(task);
    if (taskID < 0) return;
    this.taskList.splice(taskID, 1);
  }

  deleteTasksOfProject(taskList) {
    taskList.forEach((task) => {
      this.taskList.splice(this.taskList.indexOf(task), 1);
    });
  }

  importTasks(projectList: Project[]) {
    let importedTasks = [];

    projectList.forEach((project) => {
      if (project.projectTaskList) {
        project.projectTaskList.forEach((elem) => {
          importedTasks.push(elem);
        });
      }
    });
    this.taskList = importedTasks;
  }
}
