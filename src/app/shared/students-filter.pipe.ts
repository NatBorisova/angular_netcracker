import { Pipe, PipeTransform } from "@angular/core";
import { IStudent } from "../app.component";

@Pipe({
    name: "studentsBirthDateFilter"
})
export class StudentsBirthDateFilterPipe implements PipeTransform {
    transform(students: IStudent[], birthDate: Date): IStudent[] {
        if (birthDate.toString() === new Date("1970-01-01").toString() || birthDate.toString() === "") {
            return students;
        }
        return students.filter(student => student.birthDate.toString() === (new Date(birthDate)).toString());
    }
}

@Pipe({
    name: "studentsAverageRatingFilter"
})
export class StudentsAverageRatingFilterPipe implements PipeTransform {
    transform(students: IStudent[], averageRating: number): IStudent[] {
        if (averageRating === null || averageRating === 0) {
            return students;
        }
        return students.filter(student => student.averageRating === averageRating);
    }
}
