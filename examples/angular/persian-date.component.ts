import { Component } from "@angular/core";
import { persianDate, PersianDate } from "persian-date-native";

@Component({
  selector: "app-persian-date",
  standalone: true,
  template: `
    <div dir="rtl" style="font-family: sans-serif; padding: 20px;">
      <h2>نمونه Angular Component</h2>
      <p>تاریخ: {{ current.formatFa('dddd D MMMM YYYY') }}</p>
      <button (click)="nextWeek()">هفته بعد</button>
    </div>
  `
})
export class PersianDateComponent {
  current: PersianDate = persianDate();

  nextWeek() {
    this.current = persianDate(this.current).add(1, "week");
  }
}
