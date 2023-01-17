import { AuthService } from "./../auth/auth.service";
import { Component, DoCheck, OnInit, Output, ViewChild } from "@angular/core";
import { ProjectsService } from "../services/projects.service";
import { Project } from "../shared/models/project.model";
import { ElementRef } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit, DoCheck {
  @ViewChild("nameInput", { static: false }) nameInputRef: ElementRef;
  projectList: Project[];
  createProject: boolean = false;
  constructor(
    private projectService: ProjectsService,
    private router: Router,
    private authService: AuthService
  ) {}

  isLoading = false;

  onCreate() {
    this.projectService.createProject(this.nameInputRef.nativeElement.value);
    this.createProject = false;
  }

  toggleCreate() {
    this.createProject = this.createProject ? false : true;
  }

  ngOnInit(): void {
    this.projectList = this.projectService.getProjectList();
    this.authService.isLoading.subscribe((resData) => {
      this.isLoading = resData;
    });
    this.projectService.isLoading.subscribe((resData) => {
      this.isLoading = true;
      setTimeout(this.toggleLoading.bind(this), 1000);
    });
  }

  onDelete(project) {
    this.projectService.deleteProject(project);
  }

  toggleLoading() {
    this.isLoading = false;
  }

  ngDoCheck(): void {
    this.projectList = this.projectService.getProjectList();
  }
}
