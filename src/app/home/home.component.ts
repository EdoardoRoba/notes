import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = '';
  content = '';
  expDate = '';
  category = '';
  categoryFilter = '';
  titleFilter = '';
  dataFilter = '';
  linkRef : any;
  link : any;
  retrievedData: any;
  durationInSeconds = 5;
  valid = false;
  outGet = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;

  constructor(private http: HttpClient,private store: AngularFirestore,public dialog: MatDialog){}
  
  ngOnInit() {}

  onPost() {
    let nota = {title: this.title, content: this.content, expiring: this.expDate, category: this.category}
    console.log(nota)
    if ((this.title!="") && (this.content!="") && (this.expDate!="") && (this.category!="")){
      this.http.post('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json',nota).subscribe(responseData => {
        console.log(responseData);
      });
    }
    this.valid = true
    this.title = '';
    this.content = '';
    this.expDate = '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onGet(){
    
  }

  onPut(){

  }

  onDelete(){

  }

}
