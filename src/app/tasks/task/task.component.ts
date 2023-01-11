import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/projects.service';
import { Task } from 'src/app/task';
import { TaskListService } from 'src/app/task-list.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  editTask: boolean = false;

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

  onEdit(task: Task) {
    this.editTask = this.editTask ? false : true;
  }

  onSave() {
    this.editTask = false;
  }
  onDelete(task) {
    this.projectService.deleteTask(task);
  }
}
