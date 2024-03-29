import { Task } from "src/app/shared/interfaces/task";

export class Project {
  constructor(
    public projectName: string,
    public projectTaskList: Task[],
    public projectID?: number,
    public id?: string
  ) {}
}
