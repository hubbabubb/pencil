import {Injectable} from '@angular/core';
import {HEADER_TITLES, HeaderTitle} from "../constants/header.constants";
import {BehaviorSubject, Observable} from "rxjs";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _title = new BehaviorSubject<HeaderTitle>({
    title: HEADER_TITLES.INIT,
    editable: false
  });

  constructor(private titleService: Title) {
    this.subscribeForBrowserTitle();
  }

  private subscribeForBrowserTitle() {
    this._title.subscribe(title => {
      this.titleService.setTitle("Pencil - " + title.title);
    })
  }


  get title(): Observable<HeaderTitle> {
    return this._title.asObservable();
  }

  setTitle(value: HeaderTitle) {
    this._title.next(value);
  }
}
