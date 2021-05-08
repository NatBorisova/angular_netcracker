import { RouterModule, Routes } from "@angular/router";
import { ActionFormComponent } from "./action-form/action-form.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { EditStudentGuard } from "./shared/edit-student.guard";
import { StudentsComponent } from "./students/students.component";

const routes: Routes = [
    { path: "", component: StudentsComponent },
    { path: "add", component: ActionFormComponent },
    { path: "edit/:id", component: ActionFormComponent, canActivate: [EditStudentGuard] },
    { path: "**", component: PageNotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);
