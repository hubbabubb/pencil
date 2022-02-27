import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FooterService} from "../../service/footer.service";
import {FooterProperties} from "../../constants/footer.constants";

@Component({
  selector: 'app-note-footer',
  templateUrl: './note-footer.component.html',
  styleUrls: ['./note-footer.component.scss']
})
export class NoteFooterComponent implements OnInit, OnDestroy {

  private propertiesSubscription: Subscription;

  public footerProperties: FooterProperties;

  constructor(
    private footerService: FooterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.propertiesSubscription = this.footerService.footerProperties$.subscribe(props => {
      this.footerProperties = props;
    })
  }

  onSave() {
    this.footerService.saveEmitter.next('');
  }

  onDelete() {
    this.footerService.deleteEmitter.next('');
  }

  onClose() {
    this.router.navigate([''])
      .catch(err => console.error(err));
  }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }
}
