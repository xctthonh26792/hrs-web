import { Injectable, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from '../utils';

import * as _ from 'lodash';

@Injectable()
export class ModalService {
    constructor(private dialog: MatDialog) { }

    async show<T>(component: Type<T>, bindings?: any, conf?: any) {
        const parameters = await Utils.resolve(bindings) || {}
        const instance = this.dialog.open(component, {
            disableClose: true,
            data: parameters,
            width: _.get(conf, 'width'),
            height: _.get(conf, 'height')
        })
        return await instance.afterClosed();
    }
}
