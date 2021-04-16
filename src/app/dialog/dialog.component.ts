import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommunicationService } from '../communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  user = ''
  keys = ''
  timer = setTimeout(()=>{}, 1000);

  constructor(private http: HttpClient,@Inject(MAT_DIALOG_DATA) public retrievedData: any, private _snackBar: MatSnackBar, private data: CommunicationService) {
    console.log("window: ",retrievedData)
  }

  ngOnInit(): void {}

  deleteNote(note: any){
    this.user = note.user

    this.openSnackBar("Processing...")
    clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
        this.retrievedData.splice(this.retrievedData.indexOf(note),1)
        this.openSnackBar("La nota è stata eliminata!")
      }, 1000);
    
    this.http.delete('https://notes-c66a1-default-rtdb.firebaseio.com/notes/'+this.user+'/'+note.category+'/'+note.id+'.json').subscribe((response) => {
      console.log("Note with id ",note.id," is deleted!")
    },
    (error)=>{
      console.log("Note does not exist. Error: "+error)
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 1000
    });
  }

}
