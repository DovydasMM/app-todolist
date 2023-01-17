import { Subject } from "rxjs";
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

  isLoggedIn = false;
  isLoading = new Subject<boolean>();

  projectList: Project[] = [
    {
      projectName: "Studying for University",
      id: `0`,
      projectTaskList: [
        {
          name: "Read Course Material",
          description:
            " Read through the course material for the upcoming exam",
          priority: true,
          date: new Date("2023-01-16").toISOString().slice(0, 10),
        },
        {
          name: "Practice Questions",
          description: " Work through practice questions for the upcoming exam",
          priority: true,
          date: new Date("2023-01-22").toISOString().slice(0, 10),
        },
        {
          name: "Review Notes",
          description:
            " Review notes from previous lectures and any supplemental materials",
          priority: false,
          date: new Date("2023-01-27").toISOString().slice(0, 10),
        },
      ],
    },
    {
      projectName: "House chores",
      id: `1`,
      projectTaskList: [
        {
          name: "Clean kitchen",
          description: "Clean kitchen surfaces and floors, and put away dishes",
          priority: true,
          date: new Date("2023-01-16").toISOString().slice(0, 10),
        },
        {
          name: "Vacuum the living room",
          description:
            " Vacuum the living room and move furniture to get into all the crevices",
          priority: false,
          date: new Date("2023-01-19").toISOString().slice(0, 10),
        },
      ],
    },
  ];

  temporaryProjects: Project[] = [
    {
      projectName: "Studying for University",
      id: `0`,
      projectTaskList: [
        {
          name: "Read Course Material",
          description:
            " Read through the course material for the upcoming exam",
          priority: true,
          date: new Date("2023-01-16").toISOString().slice(0, 10),
        },
        {
          name: "Practice Questions",
          description: " Work through practice questions for the upcoming exam",
          priority: true,
          date: new Date("2023-01-22").toISOString().slice(0, 10),
        },
        {
          name: "Review Notes",
          description:
            " Review notes from previous lectures and any supplemental materials",
          priority: false,
          date: new Date("2023-01-27").toISOString().slice(0, 10),
        },
      ],
    },
    {
      projectName: "House chores",
      id: `1`,
      projectTaskList: [
        {
          name: "Clean kitchen",
          description: "Clean kitchen surfaces and floors, and put away dishes",
          priority: true,
          date: new Date("2023-01-16").toISOString().slice(0, 10),
        },
        {
          name: "Vacuum the living room",
          description:
            " Vacuum the living room and move furniture to get into all the crevices",
          priority: false,
          date: new Date("2023-01-19").toISOString().slice(0, 10),
        },
      ],
    },
  ];

  getProjectList() {
    if (this.isLoggedIn) return this.projectList;
    else {
      this.taskService.importTasks(this.projectList);
      return this.projectList;
    }
  }

  getProjectByID(id) {
    if (this.isLoggedIn) return this.projectList[id];
    else {
      return this.projectList[id];
    }
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

    // If user is not logged in, data will not be saved
    if (!this.isLoggedIn) return;
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
    // If user is not logged in, data will not be saved
    if (!this.isLoggedIn) return;
    this.postService.updateProject(currentProject).subscribe();
  }

  deleteTask(task, currentProject: any = "") {
    if (currentProject == "") {
      const project = this.projectList.find((list) =>
        list.projectTaskList.includes(task)
      );
      const taskID = project.projectTaskList.indexOf(task);
      project.projectTaskList.splice(taskID, 1);
      this.taskService.deleteTask(task);
      // If user is not logged in, data will not be saved
      if (!this.isLoggedIn) return;
      this.postService.updateProject(project).subscribe();
    } else this.taskService.deleteTask(task);
  }

  deleteProject(project: Project) {
    if (project.projectTaskList.length)
      this.taskService.deleteTasksOfProject(project.projectTaskList);
    this.projectList.splice(this.projectList.indexOf(project), 1);
    this.router.navigate(["/all"]);
    // If user is not logged in, data will not be saved
    if (!this.isLoggedIn) return;
    this.postService.deletePost(project.id);
  }

  importProject() {
    this.postService.fetchPost().subscribe((responseData) => {
      this.isLoggedIn = true;
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

  fillProjects() {
    return structuredClone(this.temporaryProjects);
  }

  clearProjects() {
    this.projectList = this.fillProjects();
    this.isLoggedIn = false;
    this.taskService.clearTaskList();
    this.postService.clearUserId();
    this.isLoading.next(true);
  }
}
