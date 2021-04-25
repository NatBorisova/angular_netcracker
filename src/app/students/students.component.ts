import { Component, Input } from "@angular/core";
import { IStudent } from "../app.component";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"]
})

export class StudentsComponent {

  @Input() students: IStudent[] = [];

  private tableTitle: string = "List of students";
  searchString: string = "";
  filterBirthDate: Date = new Date("1970-01-01");
  filterAverageRating: number = 0;
  readonly lowRating: number = 3;
  isStudentsHighlighted: boolean = true;
  isPopupVisible: boolean = false;
  idDeleteStudent: number = 0;

  public deleteStudent(id: number): void {
    this.isPopupVisible = true;
    this.idDeleteStudent = id;
  }

  public searchStudent(value: string): boolean {
    if (this.searchString === "") {
      return false;
    } else {
      return RegExp(this.searchString.toLowerCase()).test(value.toLowerCase());
    }
  }

  public sort(property: string, order: string): void {
    this.students.sort(this.compare(property, order));
  }

  private compare(property: string, order: string) {
    return (a: any, b: any) => {
      if (a[property] > b[property]) {
        return 1 * ((order === 'asc') ? 1 : -1);
      }
      if (a[property] < b[property]) {
        return -1 * ((order === 'asc') ? 1 : -1);
      }
      return 0;
    }
  }

  closePopup(isDelete: boolean): void {
    this.isPopupVisible = false;
    if (isDelete) {
      this.students = this.students.filter(s => s.id !== this.idDeleteStudent);
    }
    this.idDeleteStudent = 0;
   }
}
