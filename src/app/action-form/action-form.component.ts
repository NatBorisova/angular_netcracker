import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentsService } from "../shared/students.service";

@Component({
    selector: "app-action-form",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./action-form.component.html",
    styleUrls: ["./action-form.component.css"]
})

export class ActionFormComponent implements OnInit {

    date: Date = new Date();
    isFormInvalid: boolean = false;
    actionForm: FormGroup;
    id: number = 0;

    constructor(private fb: FormBuilder, public studentsService: StudentsService, private router: Router, private activateRoute: ActivatedRoute) {
        this.actionForm = this.fb.group({});
        this.date.setFullYear(this.date.getFullYear() - 10);
        this.isFormInvalid = false;
    }

    ngOnInit(): void {

        this.id = +this.activateRoute.snapshot.params["id"];
        const student = this.studentsService.getStudent(this.id);

        this.actionForm = this.fb.group({
            fullName: this.fb.group({
                name: [student ? student.name : "", [Validators.required]],
                patronymic: [student ? student.patronymic : "", [Validators.required]],
                surname: [student ? student.surname : "", [Validators.required]],
            }),
            birthDate: [(student ? new Date(student.birthDate) : this.date).toISOString().substring(0, 10), [this.birthDateValidator.bind(this)]],
            averageRating: student ? student.averageRating : ""
        });
        this.actionForm.controls.fullName.setValidators([Validators.required, this.fullNameValidator.bind(this)]);
    }

    birthDateValidator(control: FormControl): { [s: string]: boolean } {
        if (new Date(control.value) > this.date) {
            return { "birthDate": true };
        }
        return {};
    }

    fullNameValidator(control: FormControl): { [s: string]: boolean } {
        if (control.value.name === control.value.patronymic
            || control.value.name === control.value.surname) {
            return { "fullName": true };
        }
        return {};
    }

    ok(): void {
        if (this.actionForm.invalid) {
            this.isFormInvalid = true;
            return;
        }
        const student = {
            id: this.id,
            name: this.actionForm.get("fullName.name")?.value,
            patronymic: this.actionForm.get("fullName.patronymic")?.value,
            surname: this.actionForm.get("fullName.surname")?.value,
            birthDate: this.actionForm.value.birthDate,
            averageRating: this.actionForm.value.averageRating
        };
        if (student.id) {
            this.studentsService.edit(student);
        } else {
            this.studentsService.add(student);
        }
        this.router.navigate(["/"]);
    }
}
