import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

export interface Config {
  content: string;
  title: string;
  date: any;
}

@Component({
  selector: 'app-get-output',
  templateUrl: './get-output.component.html',
  styleUrls: ['./get-output.component.css']
})
export class GetOutputComponent implements OnInit {

  retrievedData : any //[] //Config = {
  //   content: "string",
  //   title: "string",
  //   date: "any",
  // }
  items = []
  // retrievedData : any

  constructor(private http: HttpClient,private af:AngularFireDatabase) {}

  ngOnInit(): void {
    this.retrievedData = this.http.get('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json')
    // let obj = this.http.get('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json').toPromise().then((responseData) => {
    //   // this.handleResponse(responseData);
    //   console.log("data",responseData)
    //   for (let key in responseData){
    //     if (responseData.hasOwnProperty(key)){
    //       this.items.push(responseData[key]);
    //     }
    //   }
    // });
    // this.retrievedData = this.af.list('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json').snapshotChanges();
    // let obj = this.http.get<Config>('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json').pipe(map((result: Config) => result));
    // console.log("obj",obj)
    // console.log("pppppppp",this.retrievedData)
  }

  // handleResponse(response: Config){
  //   this.retrievedData = response
  // }

}
