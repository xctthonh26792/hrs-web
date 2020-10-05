import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import * as _ from 'lodash';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
    title: string;
    body: string;
    constructor(private ref: MatDialogRef<ConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) bindings: any) {
        this.title = _.get(bindings, 'title');
        this.body = _.get(bindings, 'body');
    }

    accept() {
        this.ref.close(true)
    }

    cancel() {
        this.ref.close(false)
    }
}
