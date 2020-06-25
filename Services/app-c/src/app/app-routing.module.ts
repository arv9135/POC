import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompAComponent } from './comp-a/comp-a.component';
import { CompBComponent } from './comp-b/comp-b.component';
import { CompCComponent } from './comp-c/comp-c.component';
import { CompDComponent } from './comp-d/comp-d.component';
import { CompEComponent } from './comp-e/comp-e.component';


const routes: Routes = [
  { path: 'a', component: CompAComponent },
  { path: 'b', component: CompBComponent },
  { path: 'c', component: CompCComponent },
  { path: 'd', component: CompDComponent },
  { path: 'e', component: CompEComponent },
  { path: '**', redirectTo: 'a' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
