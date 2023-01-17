import { Task } from "./task";

export interface Project {
  projectName: string;
  projectTasks: Task[];
  projectID: number;
  id: string;
}
