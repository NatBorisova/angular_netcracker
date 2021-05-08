import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { StudentsService } from "../shared/students.service";

@Component({
  selector: "app-students",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"]
})

export class StudentsComponent {

  searchString: string = "";
  filterBirthDateLeft: Date = new Date("1970-01-01");
  filterBirthDateRight: Date = new Date("1970-01-01");
  filterAverageRatingLeft: number = 0;
  filterAverageRatingRight: number = 0;
  readonly lowRating: number = 3;
  isStudentsHighlighted: boolean = true;
  isPopupVisible: boolean = false;
  idDeleteStudent: number = 0;

  constructor(public studentsService: StudentsService, private router: Router) { }

  public deleteStudent(id: number): void {
    this.isPopupVisible = true;
    this.idDeleteStudent = id;
  }

  public closePopup(isDelete: boolean): void {
    this.isPopupVisible = false;
    if (isDelete) {
      this.studentsService.delete(this.idDeleteStudent);
    }
    this.idDeleteStudent = 0;
  }

  public searchStudent(value: string): boolean {
    if (this.searchString === "") {
      return false;
    }
    return RegExp(this.searchString.toLowerCase()).test(value.toLowerCase());
  }
}
