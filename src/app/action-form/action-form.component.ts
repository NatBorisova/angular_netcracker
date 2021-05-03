import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { IStudent } from "../app.component";

@Component({
    selector: "app-action-form",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./action-form.component.html",
    styleUrls: ["./action-form.component.css"]
})

export class ActionFormComponent implements OnInit {

    @Input() student:
        IStudent = {
            id: 0,
            name: "",
            patronymic: "",
            surname: "",
            birthDate: new Date(),
            averageRating: 0
        };
    @Input() isAddEditForm: boolean = false;
    @Output() isAddEditFormChange = new EventEmitter();
    @Output() onClick = new EventEmitter();

    date: Date = new Date();
    isFormInvalid: boolean = false;
    actionForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.actionForm = this.fb.group({});
        this.date.setFullYear(this.date.getFullYear() - 10);
        this.student.birthDate = this.date;
        this.isFormInvalid = false;
    }

    ngOnInit(): void {
        this.actionForm = this.fb.group({
            fullName: this.fb.group({
                name: [this.student.name, [Validators.required]],
                patronymic: [this.student.patronymic, [Validators.required]],
                surname: [this.student.surname, [Validators.required]],
            }),
            birthDate: [this.student.birthDate.toISOString().substring(0, 10), [this.birthDateValidator.bind(this)]],
            averageRating: this.student.averageRating
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

    close(): void {
        this.isAddEditForm = false;
        this.isAddEditFormChange.emit(this.isAddEditForm);
    }

    ok(): void {
        if (this.actionForm.invalid) {
            this.isFormInvalid = true;
            return;
        }
        this.student = {
            id: this.student.id,
            name: this.actionForm.get("fullName.name")?.value,
            patronymic: this.actionForm.get("fullName.patronymic")?.value,
            surname: this.actionForm.get("fullName.surname")?.value,
            birthDate: this.actionForm.value.birthDate,
            averageRating: this.actionForm.value.averageRating
        };
        this.isAddEditForm = false;
        this.isAddEditFormChange.emit(this.isAddEditForm);
        this.onClick.emit(JSON.stringify(this.student));
    }
}
