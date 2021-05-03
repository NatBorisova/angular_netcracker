import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IStudent } from "../app.component";

@Component({
  selector: "app-students",
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"]
})

export class StudentsComponent {

  @Input() students: IStudent[] = [];

  student: IStudent = {
    id: 0,
    name: "",
    patronymic: "",
    surname: "",
    birthDate: new Date("1970-01-01"),
    averageRating: 0
  };
  searchString: string = "";
  filterBirthDateLeft: Date = new Date("1970-01-01");
  filterBirthDateRight: Date = new Date("1970-01-01");
  filterAverageRatingLeft: number = 0;
  filterAverageRatingRight: number = 0;
  readonly lowRating: number = 3;
  isStudentsHighlighted: boolean = true;
  isPopupVisible: boolean = false;
  idDeleteStudent: number = 0;
  isAddEditForm: boolean = false;

  public deleteStudent(id: number): void {
    this.isPopupVisible = true;
    this.idDeleteStudent = id;
  }

  public editStudent(student: IStudent): void {
    this.student = student;
    this.isAddEditForm = true;
  }

  public addNewStudent(): void {
    this.isAddEditForm = true;
  }

  closeForm(studentStr: string): void {
    this.clearStudent();
    const newStudent = JSON.parse(studentStr);
    newStudent.birthDate = new Date(newStudent.birthDate);
    if (newStudent.id !== 0) {
      this.students[newStudent.id - 1] = newStudent;
    } else {
      newStudent.id = this.students.length + 1;
      this.students.push(newStudent);
    }
  }

  clearStudent(): void {
    this.student = {
      id: 0,
      name: "",
      patronymic: "",
      surname: "",
      birthDate: new Date("1970-01-01"),
      averageRating: 0
    };
  }

  public searchStudent(value: string): boolean {
    if (this.searchString === "") {
      return false;
    }
    return RegExp(this.searchString.toLowerCase()).test(value.toLowerCase());
  }

  public sort(property: string, order: string): void {
    this.students.sort(this.compare(property, order));
  }

  private compare(property: string, order: string): any {
    return (a: any, b: any) => {
      if (a[property] > b[property]) {
        return 1 * ((order === "asc") ? 1 : -1);
      }
      if (a[property] < b[property]) {
        return -1 * ((order === "asc") ? 1 : -1);
      }
      return 0;
    };
  }

  closePopup(isDelete: boolean): void {
    this.isPopupVisible = false;
    if (isDelete) {
      this.students = this.students.filter(s => s.id !== this.idDeleteStudent);
    }
    this.idDeleteStudent = 0;
  }
}
