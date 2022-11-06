import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NameGeneratorPage } from './name-generator.page';

const routes: Routes = [
  {
    path: '',
    component: NameGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NameGeneratorPageRoutingModule {}
