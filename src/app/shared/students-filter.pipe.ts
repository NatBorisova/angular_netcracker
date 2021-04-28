import { Pipe, PipeTransform } from "@angular/core";
import { IStudent } from "../app.component";

@Pipe({
    name: "studentsBirthDateFilter"
})
export class StudentsBirthDateFilterPipe implements PipeTransform {
    transform(students: IStudent[], birthDateLeft: Date, birthDateRight: Date): IStudent[] {
        if ((birthDateLeft.toString() === new Date("1970-01-01").toString()
            || birthDateLeft.toString() === "")
            && (birthDateRight.toString() === new Date("1970-01-01").toString()
                || birthDateRight.toString() === "")) {
            return students;
        }
        return students.filter(function (student: IStudent): boolean {
            if (birthDateLeft && (birthDateRight.toString() === new Date("1970-01-01").toString()
                || birthDateRight.toString() === "")) {
                return student.birthDate > new Date(birthDateLeft);
            }
            if (birthDateRight && (birthDateLeft.toString() === new Date("1970-01-01").toString()
                || birthDateLeft.toString() === "")) {
                return student.birthDate < new Date(birthDateRight);
            }
            return student.birthDate < new Date(birthDateRight) && student.birthDate > new Date(birthDateLeft);
        });
    }
}

@Pipe({
    name: "studentsAverageRatingFilter"
})
export class StudentsAverageRatingFilterPipe implements PipeTransform {
    transform(students: IStudent[], averageRatingLeft: number, averageRatingRight: number): IStudent[] {
        if ((averageRatingLeft === null || averageRatingLeft === 0)
            && (averageRatingRight === null || averageRatingRight === 0)) {
            return students;
        }
        return students.filter(function (student: IStudent): boolean {
            if (averageRatingLeft && !averageRatingRight) {
                return student.averageRating >= averageRatingLeft;
            }
            if (averageRatingRight && !averageRatingLeft) {
                return student.averageRating <= averageRatingRight;
            }
            return student.averageRating > averageRatingLeft && student.averageRating < averageRatingRight;
        });
    }
}
