import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  retrievedData : any[]=[]

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let obj = this.http.get('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json').subscribe((responseData:any) => {
      Object.keys(responseData).forEach(element => {
        this.retrievedData.push(responseData[element]);
      });
      console.log("data from get: ",this.retrievedData)
    });
  }

}
