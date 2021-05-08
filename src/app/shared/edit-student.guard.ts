import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { StudentsService } from "./students.service";

@Injectable()
export class EditStudentGuard implements CanActivate {

    constructor(public studentsService: StudentsService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const student = this.studentsService.getStudent(+route.params["id"]);
        if (student) {
            return student.averageRating < 5;
        }
        return true;
    }
}
