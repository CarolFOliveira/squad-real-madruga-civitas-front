import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ButtonComponent } from './components/button/button.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
