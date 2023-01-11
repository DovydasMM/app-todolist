import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Task } from 'src/app/task';
import { TaskListService } from 'src/app/task-list.service';
import { TaskModel } from 'src/app/shared/task/task.model';
import { ProjectsService } from 'src/app/projects.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent {
  constructor(
    private taskService: TaskListService,
    private projectService: ProjectsService
  ) {}
  @Input() taskToEdit: Task;
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('descriptionInput', { static: false })
  descriptionInputRef: ElementRef;
  @ViewChild('dateInput', { static: false }) dateInputRef: ElementRef;
  @Output() changeSaved = new EventEmitter<boolean>();
  onSave() {
    const newName = this.nameInputRef.nativeElement.value;
    const newDescription = this.descriptionInputRef.nativeElement.value;
    const newDate = this.dateInputRef.nativeElement.value;
    const newTask = new TaskModel(
      newName,
      newDescription,
      newDate,
      this.taskToEdit.priority
    );
    this.taskService.onTaskEdit(this.taskToEdit, newTask);
    this.changeSaved.emit(true);
  }
  onCancel() {
    this.changeSaved.emit(true);
  }
}
