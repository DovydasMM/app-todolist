import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskComponent } from "./tasks/task/task.component";
import { TaskEditComponent } from "./tasks/task-edit/task-edit.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterModule, Routes } from "@angular/router";
import { ImportantComponent } from "./tasks/important/important.component";
import { ProjectsComponent } from "./projects/projects.component";
import { TaskListService } from "./task-list.service";
import { HomeComponent } from "./home/home.component";
import { ProjectTasksComponent } from "./projects/project-tasks/project-tasks.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { DropdownDirective } from "./dropdown.directive";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthComponent } from "./auth/auth/auth.component";
import { LoadSpinnerComponent } from "./shared/load-spinner/load-spinner/load-spinner.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "auth", component: AuthComponent },
      { path: ":type", component: ImportantComponent },

      { path: "not-found", component: PageNotFoundComponent },
    ],
  },

  {
    path: "projects",
    component: ProjectsComponent,
    children: [{ path: ":id", component: ProjectTasksComponent }],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    TaskEditComponent,
    SidebarComponent,
    ImportantComponent,
    ProjectsComponent,
    HomeComponent,
    ProjectTasksComponent,
    PageNotFoundComponent,
    DropdownDirective,
    AuthComponent,
    LoadSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    TaskListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
