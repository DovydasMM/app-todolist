import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskListService } from '../task-list.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() tasks: Task[];
  constructor(private taskService: TaskListService) {}

  ngOnInit() {}
}
