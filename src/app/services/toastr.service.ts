import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class ToastrService {
  constructor(private snackbar: MatSnackBar) {

  }

  success(message: string) {
    this.snackbar.open(message, undefined, { panelClass: 'success', duration: 5000 })
  }

  error(message) {
    this.snackbar.open(message, undefined, { panelClass: 'error', duration: 5000 })
  }

  info(message) {
    this.snackbar.open(message, undefined, { panelClass: 'info', duration: 5000 })
  }

  warning(message) {
    this.snackbar.open(message, undefined, { panelClass: 'warning', duration: 5000 })
  }
}
