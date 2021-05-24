import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NodeComponent } from './node.component';

const routes: Routes = [
  {
    path: 'nodes/:id',
    component: NodeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodeRoutingModule {}
