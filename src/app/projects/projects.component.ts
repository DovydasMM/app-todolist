import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { Project } from '../shared/task/project.model';
import { TaskListService } from '../task-list.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  constructor(
    private taskService: TaskListService,
    private projectService: ProjectsService,
    private route: ActivatedRoute
  ) {}

  title;
  projectList: Project[];

  ngOnInit(): void {
    this.projectList = this.projectService.getProjectList();
  }
}
