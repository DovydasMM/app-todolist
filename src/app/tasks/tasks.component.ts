import { Component, Input, OnInit } from "@angular/core";
import { TaskListService } from "../services/task-list.service";
import { Task } from "../shared/interfaces/task";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  @Input() tasks: Task[];
  constructor(private taskService: TaskListService) {}

  ngOnInit() {}
}
