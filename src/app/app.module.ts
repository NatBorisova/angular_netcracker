import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { ActionFormComponent } from "./action-form/action-form.component";
import { AppComponent } from "./app.component";
import { StudentsAverageRatingFilterPipe, StudentsBirthDateFilterPipe } from "./shared/students-filter.pipe";
import { StudentsComponent } from "./students/students.component";

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsBirthDateFilterPipe,
    StudentsAverageRatingFilterPipe,
    ActionFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ActionFormComponent],
  providers: [],
  bootstrap: [AppComponent, ActionFormComponent]
})
export class AppModule {}
