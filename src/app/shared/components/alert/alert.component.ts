import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnChanges {
  @Input() alertMessage: string;
  visibility = { display: 'block' };

  close(event) {
    event.stopPropagation();
    const bodyRef = document.querySelector('body');
    if (this.visibility.display === 'block') {
      this.visibility.display = 'none';
      bodyRef.style.overflow = 'auto';
      bodyRef.classList.remove('modal-open');
      // this.alertMessage = null;
    } else {
      this.visibility.display = 'block';
      bodyRef.style.overflow = 'hidden';
      bodyRef.classList.add('modal-open');
      document.body.classList.add('modal-open');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // for (const propName in changes) {
    //   const chng = changes[propName];
    //   const cur = JSON.stringify(chng.currentValue);
    //   const prev = JSON.stringify(chng.previousValue);
    //   console.log(
    //     `${propName}: currentValue = ${cur}, previousValue = ${prev}`
    //   );
    // }
    console.log(changes['alertMessage'].currentValue);
    this.visibility.display = 'block';
  }
}

// style = 'overflow: hidden; padding-right: 17px;';
// and class modal-open
