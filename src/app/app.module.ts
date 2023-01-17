import { ToggleDropDirective } from "./directives/toggle-drop.directive";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { TaskComponent } from "./tasks/task/task.component";
import { TaskEditComponent } from "./tasks/task-edit/task-edit.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./tasks/main/main.component";
import { ProjectsComponent } from "./projects/projects.component";
import { TaskListService } from "./services/task-list.service";
import { HomeComponent } from "./home/home.component";
import { ProjectTasksComponent } from "./projects/project-tasks/project-tasks.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthComponent } from "./auth/auth/auth.component";
import { LoadSpinnerComponent } from "./shared/load-spinner/load-spinner/load-spinner.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { ProjectsService } from "./services/projects.service";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "auth", component: AuthComponent },
      { path: ":type", component: MainComponent },

      // { path: "not-found", component: PageNotFoundComponent },
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
    TaskComponent,
    TaskEditComponent,
    SidebarComponent,
    MainComponent,
    ProjectsComponent,
    HomeComponent,
    ProjectTasksComponent,

    AuthComponent,
    LoadSpinnerComponent,
    ToggleDropDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    TaskListService,
    ProjectsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
