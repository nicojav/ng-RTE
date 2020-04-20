import {
  Component, OnInit, ViewChild, Renderer2, forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { CommandExecutorService } from './common/services/command-executor.service';
import * as Utils from './common/utils/editor.utils';

@Component({
  selector: 'app-ngx-editor',
  templateUrl: './ngx-editor.component.html',
  styleUrls: ['./ngx-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
  }]
})

export class EditorComponent implements OnInit, ControlValueAccessor {
  @ViewChild('textArea') textArea: any;
  @ViewChild('wrapper') wrapper: any;

  Utils: any = Utils;

  private onChange: (value: string) => void;
  private onTouched: () => void;

  /**
   * @param _commandExecutor executes command from the toolbar
   * @param _renderer access and manipulate the dom element
   */
  constructor(
    private _commandExecutor: CommandExecutorService,
    private _renderer: Renderer2) { }

  /**
   * events
   */

  /** focus the text area when the editor is focussed */
  onEditorFocus() {
    this.textArea.nativeElement.focus();
  }

  /**
   * Executed from the contenteditable section while the input property changes
   * @param html html string from contenteditable
   */
  onContentChange(innerHTML: string): void {
    if (typeof this.onChange === 'function') {
      this.onChange(innerHTML);
      this.togglePlaceholder(innerHTML);
    }
  }

  onTextAreaBlur(): void {
    /** save selection if focussed out */
    this._commandExecutor.savedSelection = Utils.saveSelection();
    if (typeof this.onTouched === 'function') {
      this.onTouched();
    }
  }

  /**
   * editor actions, i.e., executes command from toolbar
   *
   * @param commandName name of the command to be executed
   */
  executeCommand(commandName: string): void {
    try {
      this._commandExecutor.execute(commandName);
    } catch (error) {
      console.log('error:', error);
    }
  }

  /**
   * Write a new value to the element.
   *
   * @param value value to be executed when there is a change in contenteditable
   */
  writeValue(value: any): void {
    this.togglePlaceholder(value);

    if (value === null || value === undefined || value === '' || value === '<br>') {
      value = null;
    }

    this.refreshView(value);
  }

  /**
   * Set the function to be called
   * when the control receives a change event.
   *
   * @param fn a function
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Set the function to be called
   * when the control receives a touch event.
   *
   * @param fn a function
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * refresh view/HTML of the editor
   *
   * @param value html string from the editor
   */
  refreshView(value: string): void {
    const normalizedValue = value === null ? '' : value;
    this._renderer.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue);
  }

  /**
   * toggles placeholder based on input string
   *
   * @param value A HTML string from the editor
   */
  togglePlaceholder(value: any): void {
    if (!value || value === '<br>' || value === '') {
      this._renderer.addClass(this.wrapper.nativeElement, 'show-placeholder');
    } else {
      this._renderer.removeClass(this.wrapper.nativeElement, 'show-placeholder');
    }
  }

  ngOnInit() {}
}
