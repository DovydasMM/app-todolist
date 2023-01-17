import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../services/projects.service";
import { Project } from "../shared/models/project.model";
import { TaskListService } from "../services/task-list.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent implements OnInit {
  constructor(private projectService: ProjectsService) {}

  title;
  projectList: Project[];

  ngOnInit(): void {
    this.projectList = this.projectService.getProjectList();
  }
}
