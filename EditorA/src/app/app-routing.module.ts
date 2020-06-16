import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentCompComponent } from './parent-comp/parent-comp.component';


const routes: Routes = [
  {
    path: '',
    component: ParentCompComponent,
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
