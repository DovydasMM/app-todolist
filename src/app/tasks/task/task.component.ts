import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectsService } from "src/app/services/projects.service";
import { Task } from "src/app/shared/interfaces/task";
import { TaskListService } from "src/app/services/task-list.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  editTask: boolean = false;
  isMenuOpen: boolean = false;

  constructor(
    private taskService: TaskListService,
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  changePriority(task: Task) {
    this.taskService.togglePriority(task);
  }

  toggleMenu() {
    if (this.isMenuOpen == false && this.editTask == true) {
      this.editTask = false;
      return;
    }
    this.isMenuOpen = !this.isMenuOpen;
    this.editTask = false;
  }

  clickedOutside() {
    this.isMenuOpen = false;
  }

  onEdit(task: Task) {
    this.editTask = this.editTask ? false : true;
    this.isMenuOpen = false;
  }

  onSave() {
    this.editTask = false;
  }
  onDelete(task) {
    this.projectService.deleteTask(task);
  }
}
