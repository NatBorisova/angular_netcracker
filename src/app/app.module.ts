import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { StudentsAverageRatingFilterPipe, StudentsBirthDateFilterPipe } from "./shared/students-filter.pipe";
import { StudentsComponent } from "./students/students.component";

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsBirthDateFilterPipe,
    StudentsAverageRatingFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
