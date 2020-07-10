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

import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { ContentComponent } from './Shared/content/content.component';
import { ChatService } from './Shared/Services/chat.service';
import { ChatComponent } from './Shared/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, TopNavComponent,
    MenuListItemComponent, SidebarComponent, TabsComponent,
    ContentComponent, ChatComponent
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
  providers: [ShellCommService, NavService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }