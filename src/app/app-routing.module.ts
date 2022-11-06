import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    redirectTo: 'ng/3',
    pathMatch: 'full'
  },
  {
    path: 'ng/:id',
    loadChildren: () => import('./pages/name-generator/name-generator.module').then( m => m.NameGeneratorPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
