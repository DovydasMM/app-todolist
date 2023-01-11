import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TaskListService } from 'src/app/task-list.service';
import { Task } from 'src/app/task';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectsService } from 'src/app/projects.service';
import { Project } from 'src/app/project';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.css'],
})
export class ImportantComponent implements OnInit, DoCheck {
  constructor(
    private taskService: TaskListService,
    private route: ActivatedRoute,
    private projectService: ProjectsService
  ) {}

  taskType;
  tasks;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.taskType = this.route.snapshot.params['type'];
      this.tasks = this.taskService.getTasks(this.taskType);
    });
  }

  ngDoCheck(): void {
    this.tasks = this.taskService.getTasks(this.taskType);
  }
}
