import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Injectable()
export class SeoService {
    prefix: string;
    constructor(private title: Title, private meta: Meta) { }

    init(prefix: string) {
        this.prefix = prefix;
    }

    set(title: string) {
        this.title.setTitle(`${this.prefix} - ${title}`);
        return this;
    }

    private _meta(name: string) {
        const selector = `meta[name=${name}]`;
    }
}
