import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    constructor() {
    }

    resolve(key: string, value?: any): any {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
        const loc = localStorage.getItem(key);
        return loc ? JSON.parse(loc) : undefined;
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}
