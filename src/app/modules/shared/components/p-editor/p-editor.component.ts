import { Component, ViewEncapsulation, forwardRef, ChangeDetectorRef, Input, OnInit, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TenjinComponent } from '../p-control.component';
import { DomSanitizer } from '@angular/platform-browser';
import _ from 'lodash'

@Component({
  selector: 'p-editor',
  templateUrl: './p-editor.component.html',
  styleUrls: ['./p-editor.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TenjinEditorComponent),
      multi: true
    }
  ]
})
export class TenjinEditorComponent extends TenjinComponent implements OnInit, AfterViewInit {
  config: any;
  constructor(private ref: ChangeDetectorRef, private sanitizer: DomSanitizer) {
    super()
  }

  @Input() name: string
  @Input() placeholder: string
  @Input('fxFlex') flex: boolean
  @Input() disabled: boolean = false

  ngOnInit() {
    this.config = {
      airMode: false,
      tabDisable: true,
      popover: {
        table: [
          ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
          ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
        ],
        image: [
          ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
          ['float', ['floatLeft', 'floatRight', 'floatNone']],
          ['remove', ['removeMedia']],
        ],
        link: [['link', ['linkDialogShow', 'unlink']]],
        air: [
          [
            'font',
            [
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'superscript',
              'subscript',
              'clear',
            ],
          ],
        ],
      },
      height: '200px',
      uploadImagePath: '/api/upload',
      toolbar: [
        ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
        [
          'font',
          [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'clear',
          ],
        ],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'picture', 'link', 'video', 'hr']],
        ['customButtons', ['testBtn']],
      ],
      codeviewFilter: true,
      codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
      codeviewIframeFilter: true,
    };
  }

  ngAfterViewInit() {
    this.ref.detectChanges();
  }

  change($event: any) {
    this.onChange($event)
  }
}
