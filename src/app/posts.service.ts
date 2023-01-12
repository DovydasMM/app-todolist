import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "./shared/task/project.model";
import { map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router) {}

  createAndStorePost(project: Project) {
    return this.http
      .post(
        "https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
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
        "https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      )
      .pipe<Project[]>(
        map((responseData) => {
          const projectArray = [];
          for (const key in responseData) {
            console.log(responseData[key].hasOwnProperty("projectTaskList"));

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
        `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/posts/${projectID}.json`
      )
      .subscribe((responseData) => this.router.navigate(["/all"]));
  }

  updatePost(projectID: string, newProjectId) {
    return this.http.patch(
      `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/posts/${projectID}.json`,
      newProjectId
    );
  }

  updateProject(projectChange) {
    return this.http.patch(
      `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/posts/${projectChange.id}.json`,
      projectChange
    );
  }
}
