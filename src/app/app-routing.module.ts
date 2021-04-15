import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'app-login', component: LoginComponent },
  { path: 'notes', component: NotesComponent },
  { path: '', redirectTo: '/app-login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
