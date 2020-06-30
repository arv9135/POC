import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

import { SharedModule } from './Shared';
import { ShellCommService } from './Shared/Services/shell-comm.service';
import { HeaderComponent } from './Shared/header/header.component';
import { NavService } from './Shared/Services/nav.service';
import { TopNavComponent } from './Shared/top-nav/top-nav.component';
import { MenuListItemComponent } from './Shared/menu-list-item/menu-list-item.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, TopNavComponent, MenuListItemComponent, TabsComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    FormsModule,
    MatIconModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot()
  ],
  providers: [ShellCommService, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
