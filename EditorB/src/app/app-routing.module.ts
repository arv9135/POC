import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IframeComponent } from './iframe/iframe.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { NewTabComponent } from './new-tab/new-tab.component';


const routes: Routes = [
  {
    path: 'iframe',
    component: IframeComponent

  },
  {
    path: 'pop-up',
    component: PopUpComponent
  },
  {
    path: 'new-tab',
    component: NewTabComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
