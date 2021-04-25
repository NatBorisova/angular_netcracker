import { Component, Input } from "@angular/core";
import { IStudent } from "../app.component";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"]
})

export class StudentsComponent {

  @Input() students: IStudent[] = [];

  tableTitle: string = "List of students";

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
  }
}
