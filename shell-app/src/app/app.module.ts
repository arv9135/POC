import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './Shared';
import { ShellCommService } from './Shared/Services/shell-comm.service';
import { HeaderComponent } from './Shared/header/header.component';
import { MenuListItemComponent } from './Shared/menu-list-item/menu-list-item.component';
import { NavService } from './Shared/Services/nav.service';
import { TopNavComponent } from './Shared/top-nav/top-nav.component';

@NgModule({
  declarations: [
    AppComponent, MenuListItemComponent, HeaderComponent, TopNavComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot()
  ],
  providers: [ShellCommService, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
