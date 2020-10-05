import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoadingService {
  public listener = new EventEmitter<boolean>();
  start() {
    this.listener.emit(true);
  }

  stop() {
    this.listener.emit(false);
  }
}
