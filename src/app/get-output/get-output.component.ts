import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-output',
  templateUrl: './get-output.component.html',
  styleUrls: ['./get-output.component.css']
})
export class GetOutputComponent implements OnInit {

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
