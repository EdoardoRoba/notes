import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  content = '';
  expDate = '';
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  notes = this.store.collection('notes').valueChanges({note:'note'});
  constructor(private http: HttpClient,private store: AngularFirestore){}
  ngOnInit() {}

  onInsert() {
  // Send Http request
  // console.log(this.title)
  // console.log(this.content)
  let nota = {title: this.title, content: this.content, expiring: this.expDate}
  console.log(nota)
  this.http.post('https://notes-c66a1-default-rtdb.firebaseio.com/'+this.title+'.json',nota).subscribe(responseData => {
    console.log(responseData);
  });
  this.title = '';
  this.content = '';
  this.expDate = '';
}
}
