import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverConfig } from 'ngx-bootstrap';
import { CommandExecutorService } from '../common/services/command-executor.service';
import { WordsService} from '../common/services/words.service';
import * as Utils from '../common/utils/editor.utils';

@Component({
  selector: 'app-ngx-editor-toolbar',
  templateUrl: './ngx-editor-toolbar.component.html',
  styleUrls: ['./ngx-editor-toolbar.component.scss'],
  providers: [PopoverConfig]
})

export class ToolbarComponent implements OnInit {
  synonymus : any;

  /** holds values of the insert image form */
  imageForm: FormGroup;

  @ViewChild('synonymusPopover') synonymusPopover;
  /**
   * Emits an event when a toolbar button is clicked
   */
  @Output() execute: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _popOverConfig: PopoverConfig,
    private _formBuilder: FormBuilder,
    private _commandExecutorService: CommandExecutorService,
    private _wordsService: WordsService
    ) {
    this._popOverConfig.outsideClick = true;
    this._popOverConfig.placement = 'bottom';
    this._popOverConfig.container = 'body';
  }

  triggerCommand(command: string): void {
    this.execute.emit(command);
  }

  onGetSynonymus(): void {
    const selection = Utils.getSelection();
    this.synonymus = this._wordsService.getWords(selection);
  }

  selectSynonymus(word) : void {
    this._commandExecutorService.insertSynonymous(word);
  }
  
  ngOnInit() {
    Utils.setSelectionOnChange();
  }
}
