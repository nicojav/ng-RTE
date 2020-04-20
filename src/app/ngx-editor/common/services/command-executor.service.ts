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
    console.log('command:', command)
    document.execCommand(command, false, null);
  }

  /**
   * inserts insertSynonymous in the editor
   *
   * @param text synonimus to insert
   */
  insertSynonymous(text : string ) : void {
    if (this.savedSelection) {
      const restored = Utils.restoreSelection(this.savedSelection);
      if (restored) {
        document.execCommand('insertText', false, text);
      }
   }   
  }

  /** insert HTML */
  private insertHtml(html: string): void {
    const isHTMLInserted = document.execCommand('insertHTML', false, html);

    if (!isHTMLInserted) {
      throw new Error('Unable to perform the operation');
    }
  }

  /** delete the text at selected range and return the value */
  private deleteAndGetElement(): any {
    let slectedText;

    if (this.savedSelection) {
      slectedText = this.savedSelection.toString();
      this.savedSelection.deleteContents();
      return slectedText;
    }

    return false;
  }

  /** check any slection is made or not */
  private checkSelection(): any {
    const slectedText = this.savedSelection.toString();

    if (slectedText.length === 0) {
      throw new Error('No Selection Made');
    }

    return true;
  }

}
