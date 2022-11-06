import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NameGeneratorPageRoutingModule } from './name-generator-routing.module';

import { NameGeneratorPage } from './name-generator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NameGeneratorPageRoutingModule
  ],
  declarations: [NameGeneratorPage]
})
export class NameGeneratorPageModule {}
