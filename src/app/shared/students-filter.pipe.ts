import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "studentsBirthDateFilter"
})
export class StudentsBirthDateFilterPipe implements PipeTransform {
    transform(students: any[], birthDateLeft: any, birthDateRight: Date): any[] {
        if ((birthDateLeft.toString() === new Date("1970-01-01").toString()
            || birthDateLeft.toString() === "")
            && (birthDateRight.toString() === new Date("1970-01-01").toString()
                || birthDateRight.toString() === "")) {
            return students;
        }
        return students.filter(function (student: any): boolean {
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
    transform(students: any[], averageRatingLeft: number, averageRatingRight: number): any[] {
        if ((averageRatingLeft === null || averageRatingLeft === 0)
            && (averageRatingRight === null || averageRatingRight === 0)) {
            return students;
        }
        return students.filter(function (student: any): boolean {
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
