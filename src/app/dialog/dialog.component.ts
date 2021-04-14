import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  category: string,
  title: string,
  content: string,
  data: any
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  // retrievedData : any[]=[]
  panelOpenState = true
  // keys: String[]=[]
  dataToShow: any[]=[]

  constructor(private http: HttpClient,@Inject(MAT_DIALOG_DATA) public retrievedData: any) {
    // let tmp = this.retrievedData[0]
    console.log("window: ",retrievedData)
    // Object.keys(tmp).forEach(element => {
    //   let tmptmp = tmp[element]
    //   Object.keys(tmp[element]).forEach(el => {
    //     this.dataToShow.push(tmptmp[el])
    //   })
    //   // this.keys.push(element);
    // });
  }

  ngOnInit(): void {}

}
