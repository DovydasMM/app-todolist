export class TaskModel {
  constructor(
    public name: string,
    public description: string,
    public date,
    public priority: boolean
  ) {}
}
