import { Injectable } from '@angular/core';
import { Project } from './shared/task/project.model';
import { TaskModel } from './shared/task/task.model';
import { TaskListService } from './task-list.service';
import { Task } from './task';
import { Router } from '@angular/router';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(
    private taskService: TaskListService,
    private router: Router,
    private postService: PostsService
  ) {}
  // taskList = this.taskService.getTasks('all').taskList;
  // project1 = new Project(
  //   'First project',
  //   [this.taskList[0], this.taskList[1]],
  //   1
  // );
  // project2 = new Project('Second project', [this.taskList[2]], 2);
  // projectList: Project[] = [this.project1, this.project2];
  projectList: Project[];

  getProjectList() {
    return this.projectList;
  }

  getProjectByID(id) {
    return this.projectList[id];
  }

  createProject(name) {
    let id = '';
    let taskArray = [];
    let newProject: Project = new Project(
      name,
      taskArray,
      this.projectList.length - 1,
      id
    );
    this.projectList.push(newProject);
    this.router.navigate([`/projects/${this.projectList.length}`]);
    this.postService
      .createAndStorePost(newProject)
      .subscribe((responseData) => {
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
  }

  deleteTask(task, currentProject: any = '') {
    if (currentProject == '') {
      const project = this.projectList.find((list) =>
        list.projectTaskList.includes(task)
      );
      const taskID = project.projectTaskList.indexOf(task);
      project.projectTaskList.splice(taskID, 1);
    }
    this.taskService.deleteTask(task);
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
    });
  }
}
