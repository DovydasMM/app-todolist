import { Component, DoCheck, OnInit, Output, ViewChild } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Project } from '../shared/task/project.model';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, DoCheck {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  projectList: Project[];
  createProject: boolean = false;
  constructor(
    private projectService: ProjectsService,
    private router: Router
  ) {}

  onCreate() {
    this.projectService.createProject(this.nameInputRef.nativeElement.value);
    this.createProject = false;
  }

  toggleCreate() {
    this.createProject = this.createProject ? false : true;
  }

  ngOnInit(): void {
    this.projectList = this.projectService.getProjectList();
    console.log(this.projectList);
  }

  onDelete(project) {
    this.projectService.deleteProject(project);
    this.router.navigate(['/all']);
  }

  ngDoCheck(): void {
    this.projectList = this.projectService.getProjectList();
  }
}
