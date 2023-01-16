import { Injectable } from "@angular/core";
import { Project } from "./shared/task/project.model";
import { TaskModel } from "./shared/task/task.model";
import { TaskListService } from "./task-list.service";
import { Task } from "./task";
import { Router } from "@angular/router";
import { PostsService } from "./posts.service";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  constructor(
    private taskService: TaskListService,
    private router: Router,
    private postService: PostsService
  ) {}

  projectList: Project[];

  getProjectList() {
    return this.projectList;
  }

  getProjectByID(id) {
    return this.projectList[id];
  }

  createProject(name) {
    let id = "";
    let taskArray = [];
    let newProject: Project = new Project(
      name,
      taskArray,
      this.projectList.length - 1,
      id
    );
    this.projectList.push(newProject);
    this.router.navigate([`/projects/${this.projectList.length}`]);
    this.postService.postProject(newProject).subscribe((responseData) => {
      newProject.id = responseData;
      //Gets unique ID from firebase and asigns to new project
      this.postService
        .updatePost(responseData, { id: responseData })
        .subscribe();
    });
  }

  addTask(currentProject, name, desc, date) {
    const projectID = this.projectList.indexOf(currentProject);
    const newTask = new TaskModel(name, desc, date, false);
    this.projectList[projectID].projectTaskList.push(newTask);
    this.taskService.taskList.push(newTask);
    this.postService.updateProject(currentProject).subscribe();
  }

  deleteTask(task, currentProject: any = "") {
    if (currentProject == "") {
      const project = this.projectList.find((list) =>
        list.projectTaskList.includes(task)
      );
      const taskID = project.projectTaskList.indexOf(task);
      project.projectTaskList.splice(taskID, 1);
      this.postService.updateProject(project).subscribe();
      this.taskService.deleteTask(task);
    } else this.taskService.deleteTask(task);
  }

  deleteProject(project: Project) {
    this.postService.deletePost(project.id);
    if (project.projectTaskList.length)
      this.taskService.deleteTasksOfProject(project.projectTaskList);
    this.projectList.splice(this.projectList.indexOf(project), 1);
  }

  importProject() {
    this.postService.fetchPost().subscribe((responseData) => {
      this.projectList = responseData;
      this.taskService.importTasks(this.projectList);
      this.router.navigate(["/all"]);
    });

    this.taskService.taskEdited.subscribe((task) => {
      this.onTaskEdit(task);
    });
  }

  onTaskEdit(task) {
    const project = this.projectList.find((list) =>
      list.projectTaskList.includes(task)
    );

    this.postService.updateProject(project).subscribe();
  }

  clearProjects() {
    this.projectList = [];
    this.taskService.clearTaskList();
    this.postService.clearUserId();
  }
}
