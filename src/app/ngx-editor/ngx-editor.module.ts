import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap';
import { EditorComponent } from './ngx-editor.component';
import { ToolbarComponent } from './ngx-editor-toolbar/ngx-editor-toolbar.component';
import { CommandExecutorService } from './common/services/command-executor.service';
import { WordsService } from './common/services/words.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule, PopoverModule.forRoot()],
  declarations: [EditorComponent, ToolbarComponent],
  exports: [EditorComponent],
  providers: [CommandExecutorService, WordsService]
})

export class NgxEditorModule { }
