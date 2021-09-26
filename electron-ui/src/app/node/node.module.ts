import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodeRoutingModule } from './node-routing.module';

import { NodeComponent } from './node.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NodeAddComponent } from './add/add.component';

@NgModule({
  declarations: [NodeComponent, NodeAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    NodeRoutingModule,
    FontAwesomeModule
  ]
})
export class NodeModule {}
