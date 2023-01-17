import { Component, OnInit } from "@angular/core";

import { Task } from "../shared/interfaces/task";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}
  title = "All tasks";
  tasks: Task[];

  ngOnInit(): void {}
}
