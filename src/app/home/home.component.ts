import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = '';
  content = '';
  expDate = '';
  linkRef : any;
  link : any;
  retrievedData: any;
  durationInSeconds = 5;
  valid = false;
  outGet = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  notes = this.store.collection('notes').valueChanges({note:'note'});

  constructor(private http: HttpClient,private store: AngularFirestore,private _snackBar: MatSnackBar,public dialog: MatDialog){}
  
  ngOnInit() {}

  onPost() {
    // Send Http request
    // console.log(this.title)
    // console.log(this.content)
    let nota = {title: this.title, content: this.content, expiring: this.expDate}
    console.log(nota)
    if ((this.title!="") && (this.content!="") && (this.expDate!="")){
      this.http.post('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json',nota).subscribe(responseData => {
        console.log(responseData);
      });
    }
    this.valid = true
    this.title = '';
    this.content = '';
    this.expDate = '';
  }

  onGet(){
    let obj = this.http.get('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json').subscribe((responseData:any) => {
      // this.retrievedData = responseData;
      console.log("data_get",responseData)
    });
    // const dialogRef = this.dialog.open(DialogContent, {
    //   data : {obj}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  onPut(){

  }

  onDelete(){

  }

}
