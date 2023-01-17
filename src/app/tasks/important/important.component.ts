import { Component, DoCheck, OnInit } from "@angular/core";
import { TaskListService } from "src/app/services/task-list.service";
import { ActivatedRoute, Params } from "@angular/router";
import { ProjectsService } from "src/app/services/projects.service";

@Component({
  selector: "app-important",
  templateUrl: "./important.component.html",
  styleUrls: ["./important.component.css"],
})
export class ImportantComponent implements OnInit, DoCheck {
  constructor(
    private taskService: TaskListService,
    private route: ActivatedRoute,
    private projectService: ProjectsService
  ) {}

  taskType;
  tasks;
  isLoading = false;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.taskType = this.route.snapshot.params["type"];
      this.tasks = this.taskService.getTasks(this.taskType);
    });

    this.projectService.isLoading.subscribe((resData) => {
      this.isLoading = true;
      setTimeout(this.toggleLoading.bind(this), 1000);
    });
  }

  ngDoCheck(): void {
    this.tasks = this.taskService.getTasks(this.taskType);
  }

  toggleLoading() {
    this.isLoading = false;
  }
}
