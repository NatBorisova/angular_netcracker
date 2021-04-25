import { Component } from '@angular/core';

export interface IStudent{
  readonly id: number,
  name: string,
  patronymic: string,
  surname: string,
  birthDate: Date,
  averageRating: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  tableTitle: string = 'Список студентов';

  public students: IStudent[] = [
    {
      id: 1,
      name: "Павел",
      patronymic: "Иванович",
      surname: "Казаков",
      birthDate: new Date("1995-01-26"),
      averageRating: 4.5
    },
    {
      id: 2,
      name: "Анна",
      patronymic: "Борисовна",
      surname: "Швед",
      birthDate: new Date("2000-05-15"),
      averageRating: 4.7
    },
    {
      id: 3,
      name: "Дмитрий",
      patronymic: "Юрьевич",
      surname: "Чистяков",
      birthDate: new Date("1991-03-09"),
      averageRating: 2.4
    },
    {
      id: 4,
      name: "Петр",
      patronymic: "Николаевич",
      surname: "Борисов",
      birthDate: new Date("1990-10-01"),
      averageRating: 3
    },
    {
      id: 5,
      name: "Екатерина",
      patronymic: "Александровна",
      surname: "Блин",
      birthDate: new Date("1999-02-10"),
      averageRating: 4.7
    }
  ];
}
