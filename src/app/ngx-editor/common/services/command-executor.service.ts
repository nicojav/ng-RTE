import { Injectable } from '@angular/core';
import * as Utils from '../utils/editor.utils';

@Injectable()
export class CommandExecutorService {
  /** saves the selection from the editor when focussed out */
  savedSelection: any = undefined;

  constructor() { }

  /**
   * executes command from the toolbar
   *
   * @param command command to be executed
   */
  execute(command: string): void {
    document.execCommand(command, false, null);
  }

  /**
   * inserts insertSynonymous in the editor
   *
   * @param text synonimus to insert
   */
  insertSynonymous(text: string): void {
    if (this.savedSelection) {
      const restored = Utils.restoreSelection(this.savedSelection);
      if (restored) {
        document.execCommand('insertText', false, text);
      }
    }
  }
}
