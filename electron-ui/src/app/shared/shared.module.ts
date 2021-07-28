import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { UnCamelCasePipe } from "./filters/unCamelCase.pipe";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, UnCamelCasePipe],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule,UnCamelCasePipe]
})
export class SharedModule {}
