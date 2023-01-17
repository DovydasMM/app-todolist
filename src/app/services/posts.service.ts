import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "../shared/models/project.model";
import { map, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router) {}

  currentUserId: string;

  createAndStorePost(project: Project) {
    return this.http
      .put(
        `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/usersData/${this.currentUserId}.json`,
        project
      )
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            return responseData[key];
          }
        })
      );
  }

  postProject(project) {
    return this.http
      .post(
        `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/usersData/${this.currentUserId}/projectList.json`,
        project
      )
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            return responseData[key];
          }
        })
      );
  }

  fetchPost() {
    return this.http
      .get(
        `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/usersData/${this.currentUserId}/projectList.json`
      )
      .pipe<Project[]>(
        map((responseData) => {
          const projectArray = [];
          for (const key in responseData) {
            if (
              responseData.hasOwnProperty(key) &&
              !responseData[key].hasOwnProperty("projectTaskList")
            ) {
              projectArray.push({
                ...responseData[key],
                id: key,
                projectTaskList: [],
              });
            } else projectArray.push({ ...responseData[key] });
          }

          return projectArray;
        })
      );
  }

  deletePost(projectID: string) {
    this.http
      .delete(
        `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/usersData/${this.currentUserId}/projectList/${projectID}.json`
      )
      .subscribe((responseData) => this.router.navigate(["/all"]));
  }

  //Attaches POST Id to the project
  updatePost(projectID: string, newProjectId) {
    return this.http.patch(
      `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/usersData/${this.currentUserId}/projectList/${projectID}.json`,
      newProjectId
    );
  }

  updateProject(projectChange) {
    return this.http.patch(
      `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/usersData/${this.currentUserId}/projectList/${projectChange.id}.json`,
      projectChange
    );
  }

  createUserDatabase(userId: string) {
    let newData = JSON.stringify(userId);
    return this.http
      .put(
        `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/usersData/${userId}.json`,
        newData
      )
      .pipe(
        tap((resData) => {
          this.currentUserId = userId;
        })
      );
  }

  clearUserId() {
    this.currentUserId = "";
  }
}
