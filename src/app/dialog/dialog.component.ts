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

  constructor(private http: HttpClient,@Inject(MAT_DIALOG_DATA) public retrievedData: any) {}

  ngOnInit(): void {}

}
