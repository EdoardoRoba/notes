import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule}  from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DialogComponent } from './dialog/dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './login/login.component';
import { MatRadioModule } from '@angular/material/radio';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    DialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    CommonModule,
    HttpClientInMemoryWebApiModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatRadioModule,
    IonicModule.forRoot()
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }


// ng s starts the app on localhost
// npm start starts electron on a new window