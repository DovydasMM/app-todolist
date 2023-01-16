import { Component, OnInit } from "@angular/core";
import { TaskListService } from "../task-list.service";
import { Task } from "../task";
import { ActivatedRoute } from "@angular/router";
import { ProjectsService } from "../projects.service";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private taskService: TaskListService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectsService,
    private authService: AuthService
  ) {}
  title = "All tasks";
  tasks: Task[];

  ngOnInit(): void {}
}
