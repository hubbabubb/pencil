import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {FooterProperties} from "../constants/footer.constants";

@Injectable({
  providedIn: 'root'
})
export class FooterService implements OnDestroy {

  private propsSubscription: Subscription;

  saveEmitter = new EventEmitter<any>();
  deleteEmitter = new EventEmitter<any>();

  footerProperties: FooterProperties;
  footerProperties$ = new BehaviorSubject<FooterProperties>({
    editMode: false,
    isAnyNote: false,
    isAnyTodo: false,
    trashOn: false,
  });

  constructor() {
    this.subscribeForProperties();
  }

  private subscribeForProperties() {
    this.propsSubscription = this.footerProperties$.subscribe(props => {
      this.footerProperties = props;
    })
  }

  ngOnDestroy() {
    this.propsSubscription.unsubscribe();
  }
}
