import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeAgoPipe } from './ago.pipe';
import { IsStringEmptyPipe, IsStringNotEmptyPipe } from './text.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [TimeAgoPipe, IsStringEmptyPipe, IsStringNotEmptyPipe],
  declarations: [TimeAgoPipe, IsStringEmptyPipe, IsStringNotEmptyPipe]
})
export class PipesModule { }
