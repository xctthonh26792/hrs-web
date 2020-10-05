import { Observable } from 'rxjs';

export class Utils {
  private static async preresolve(promises, value, key?: string) {
    if (key === 'callback' || key === 'socket' || key === 'listener') {
      promises.push(value);
      return
    }
    if (value instanceof Function) {
      this.preresolve(promises, value());
    } else if (value instanceof Array) {
      const inpromises = [];
      value.forEach((v) => {
        this.preresolve(inpromises, v);
      });
      promises.push(Promise.all(inpromises));
    } else if (value instanceof Observable) {
      promises.push(value.toPromise());
    } else if (value instanceof Promise) {
      promises.push(value);
    } else if (value instanceof Object) {
      promises.push(this.resolve(value));
    } else {
      promises.push(value);
    }
  }

  static async resolve(value: Object) {
    const keys = [];
    const promises = [];
    for (const i in value) {
      if (value.hasOwnProperty(i)) {
        keys.push(i);
        this.preresolve(promises, value[i], i);
      }
    }
    const values = await Promise.all(promises);
    const raw = {};
    keys.forEach((key: string, index: number) => {
      raw[key] = values[index];
    });
    return raw;
  }

  static isEmailValid(email: string): boolean {
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.+[A-Z]{2,4}/igm;
    return regex.test(email);
  }

  static isNotNull(obj: any): boolean {
    return !this.isNull(obj);
  }

  static isNull(obj: any): boolean {
    return (obj === undefined || obj === null);
  }

  static isFunction(obj: any): boolean {
    return this.isNotNull(obj) && (obj instanceof Function);
  }

  static isNotFunction(obj: any): boolean {
    return !this.isFunction(obj);
  }

  static isStringEmpty(obj: string): boolean {
    return this.isNull(obj) || obj === '';
  }

  static isStringNotEmpty(obj: string): boolean {
    return !this.isStringEmpty(obj);
  }

  static isArrayEmpty(obj: any[]): boolean {
    return this.isNull(obj) || obj.length === 0;
  }

  static isArrayNotEmpty(obj: any[]): boolean {
    return !Utils.isArrayEmpty(obj);
  }

  static isHtmlNotEmpty(text: string): boolean {
    return !Utils.isHtmlEmpty(text);
  }

  static isHtmlEmpty(text: string): boolean {
    if (Utils.isNull(text)) { return true; }
    text = text.replace(/(<([^>]+)>)/ig, '');
    text = text.trim();
    return Utils.isStringEmpty(text);
  }

  static number(obj: any, defaultValue?: number) {
    if (Utils.isNull(obj) || Utils.isStringEmpty(obj) || isNaN(obj)) { return defaultValue; }
    return Number(obj);
  }

  static toSeo(value: string): string {
    if (this.isStringEmpty(value)) { return ''; }
    value = value.toLowerCase();
    value = this.parseToEnglish(value);
    value = value.replace(/[^a-z0-9\d\s\-]/g, '');
    value = value.replace(/\s*\-\s*/g, '-');
    value = value.replace(/\s+/g, '-');
    return value.trim();
  }

  static shorten(text: string, numOfCharacters: number = 300): string {
    if (Utils.isStringNotEmpty(text)) {
      text = text.replace(/(<([^>]+)>)/ig, '');
      text = text.replace(/\s+/g, ' ');
      if (text.length > numOfCharacters) {
        text = text.substr(0, numOfCharacters) + '...';
      }
    }
    return text;
  }

  static isMatch(query: string, text: string): boolean {
    const terms = this.parseToEnglish(query).toLowerCase().trim().split(/\s+|\+/g);
    for (let i = 0; i < terms.length; i++) {
      const index = text.indexOf(terms[i]);
      if (index < 0) { return false; }
      if (index > 0 && text.charAt(index - 1) !== ' ') { return false; }
    }
    return true;
  }

  static cleanUpHtml(html: string): string {
    if (Utils.isNull(html)) { return ''; }
    return html.replace(/<\/*span.*?>/gi, '');
  }

  static stripHtmlTags(text: string): string {
    return text ? text.replace(/\<.*?\>/ig, '') : undefined;
  }

  static parseToEnglish(text: string): string {
    if (Utils.isNull(text)) {
      return '';
    }
    let value = text.trim().toLowerCase();
    value = value.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/ig, 'a');
    value = value.replace(/[éèẻẽẹêếềểễệ]/ig, 'e');
    value = value.replace(/[iíìỉĩị]/ig, 'i');
    value = value.replace(/[óòỏõọơớờởỡợôốồổỗộ]/ig, 'o');
    value = value.replace(/[úùủũụưứừửữự]/ig, 'u');
    value = value.replace(/[yýỳỷỹỵ]/ig, 'y');
    value = value.replace(/[đ]/ig, 'd');
    return value;
  }
}
