import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './shared/task/project.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePost(project: Project) {
    return this.http
      .post(
        'https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
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
        'https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      .pipe(
        map((responseData) => {
          const projectArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              projectArray.push({ ...responseData[key], id: key });
            }
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
      .subscribe((responseData) => console.log(responseData));
  }

  updatePost(projectID: string, newProjectId) {
    return this.http.patch(
      `https://poor-mans-todo-default-rtdb.europe-west1.firebasedatabase.app/posts/${projectID}.json`,
      newProjectId
    );
  }
}
