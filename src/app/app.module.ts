import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { ActionFormComponent } from "./action-form/action-form.component";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { PageNotFoundComponent } from "./page-not-found.component";
import { EditStudentGuard } from "./shared/edit-student.guard";
import { StudentsAverageRatingFilterPipe, StudentsBirthDateFilterPipe } from "./shared/students-filter.pipe";
import { StudentsComponent } from "./students/students.component";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    StudentsComponent,
    StudentsBirthDateFilterPipe,
    StudentsAverageRatingFilterPipe,
    ActionFormComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [ActionFormComponent],
  providers: [EditStudentGuard],
  bootstrap: [AppComponent, ActionFormComponent]
})
export class AppModule {}
