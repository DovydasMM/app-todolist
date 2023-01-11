import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ɵɵsetComponentScope,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/projects.service';
import { Task } from 'src/app/task';
import { Project } from 'src/app/shared/task/project.model';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css'],
})
export class ProjectTasksComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('descriptionInput', { static: false })
  descriptionInputRef: ElementRef;
  @ViewChild('dateInput', { static: false }) dateInputRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService
  ) {}
  tasks;
  currentProject: Project;
  createTaskMenu = false;

  toggleCreateMenu() {
    this.createTaskMenu = this.createTaskMenu ? false : true;
  }

  onAdd() {
    const name = this.nameInputRef.nativeElement.value;
    const desc = this.descriptionInputRef.nativeElement.value;
    const date = this.dateInputRef.nativeElement.value;
    this.projectService.addTask(this.currentProject, name, desc, date);
    this.createTaskMenu = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) =>
        (this.currentProject = this.projectService.getProjectByID(
          +this.route.snapshot.params['id'] - 1
        ))
    );
  }
}
