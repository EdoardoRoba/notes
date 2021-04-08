import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { GetOutputComponent } from './get-output/get-output.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
