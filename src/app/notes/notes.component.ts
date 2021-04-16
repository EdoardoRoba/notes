import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ThemePalette } from '@angular/material/core';
import { CommunicationService } from '../communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  category: string,
  title: string,
  content: string,
  data: any
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  title = "";
  content = "";
  expDate = "";
  category = "";

  // usr = "";

  categoryFilter = "";
  titleFilter = "";
  dataFilter = new Date("");

  categoryDel = "";
  titleDel = "";
  dataDel = new Date("");

  linkRef : any;
  link : any;
  retrievedData: any//[]=[];
  valid = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  keysData: String[]=[];
  user : any;

  deleteAll = false
  color: ThemePalette = 'accent';
  isDeleted = false;

  categories: any[]=[]

  constructor(private http: HttpClient, private store: AngularFirestore, public dialog: MatDialog, private data: CommunicationService, private _snackBar: MatSnackBar){}
  
  ngOnInit() {

    this.data.currentMessage.subscribe(message => this.user = message)
    console.log("USR: ",this.user)
    //TO COMMENT:
    // this.user = "00001"

    let retrieved: any[]=[];
    this.http.get('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json').subscribe((responseData:any) => {
      Object.keys(responseData).forEach(element => {
        if (element===this.user){
          retrieved.push(responseData[element]);
          this.keysData.push(element);
        }
      });
      this.retrievedData = retrieved
      // console.log("data: ",this.retrievedData)
      Object.keys(this.retrievedData).forEach(element => {
        this.categories = (Object.keys(this.retrievedData[element]))
      });
      
    });
  }

  onPost() {
    let nota = {title: this.title, content: this.content, expiring: this.expDate, category: this.category, user: this.user}
    if ((this.title!="") && (this.content!="") && (this.expDate!="") && (this.category!="")){
      this.http.post('https://notes-c66a1-default-rtdb.firebaseio.com/notes/'+this.user+'/'+this.category+'.json',nota).subscribe(
        (responseData) => {
          console.log("posted: ",responseData);
          this.valid = true;
      },
      (error)=>{
        console.log("NOT posted!");
        alert("ERROR! Not posted. Try again.")
      });
      this.title = '';
      this.content = '';
      this.expDate = '';
      this.category = '';

      this.retrievedData = []
      this.keysData = []
      this.http.get('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json').subscribe((responseData:any) => {
        Object.keys(responseData).forEach(element => {
          if (element===this.user){
            this.retrievedData.push(responseData[element]);
            this.keysData.push(element);
          }
          // console.log("newData: ",this.retrievedData)
        });
      });
      Object.keys(this.retrievedData).forEach(element => {
        this.categories = (Object.keys(this.retrievedData[element]))
      });
      setTimeout(()=>{
          this.valid = false;
      }, 3000);
    }
    // this.valid = false;
  }

  onGet() {

    if (this.retrievedData.length>0){
      let dFilter = new Date(this.dataFilter)
      // let tmp = this.retrievedData
      let tmp = this.retrievedData[0]
      let dataToShow: any[]=[]
      Object.keys(tmp).forEach(element => {
        let tmptmp = tmp[element]
        Object.keys(tmp[element]).forEach(el => {
          dataToShow.push(tmptmp[el])
        })
        // this.keys.push(element);
      });
      //Then, we filter the data by category, title and expiring date (if present)
      if (this.categoryFilter != ""){
        // let tmp = this.retrievedData
        dataToShow = dataToShow.filter((element:any) => {
          return element.category === this.categoryFilter
        })
      }
      if (this.titleFilter != ""){
        dataToShow = dataToShow.filter((element:any) => {
          return element.title === this.titleFilter
        })
      }
      if (Date.parse(dFilter.toString())){
        // let tmp = this.retrievedData
        dataToShow = dataToShow.filter((element:any) => {
          let d = new Date(element.expiring)
          return  d <= dFilter
        })
      }

      //Inject the data in the dialog
      const dialogRef = this.dialog.open(DialogComponent,{
        data: dataToShow
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        // this.retrievedData = []
      });}

  }

  onPut(){

  }

  onDelete(){
    // CATEGORY AND TITLE REQUIRED
    // console.log("notes: ",this.retrievedData[0])
    // let toDeleteKeys: String[]=[]
    // let tmpDel = this.retrievedData
    let dDel = new Date(this.dataFilter)

    if (this.categoryDel != "" && this.titleDel === "" && !Date.parse(dDel.toString())){
      if (this.categories.includes(this.categoryDel)){
        let tmpC = this.categoryDel
        this.http.delete('https://notes-c66a1-default-rtdb.firebaseio.com/notes/'+this.user+'/'+this.categoryDel+'.json').subscribe((response) => {
            console.log("Note with category ",tmpC," is deleted!")
            this.openSnackBar("Note with category "+tmpC+" is deleted!")
            this.isDeleted = true
          },
          (error)=>{
            console.log("Category "+this.categoryDel+" does not exist. Error: "+error)
          });
        } else {
          this.openSnackBar("Note with category "+this.categoryDel+" does not exist!")
        }
    }

    // if (this.categoryDel != ""){
    //   for (var i=0;i<this.retrievedData.length;i++){
    //     if(this.retrievedData[i].category == this.categoryDel){
    //       let kd = this.keysData[i]
    //       this.http.delete('https://notes-c66a1-default-rtdb.firebaseio.com/notes/'+kd+'.json').subscribe((response) => {
    //         console.log("Note ",kd," is deleted!")
    //       });
    //     }
    //   }
    // }
    this.categoryDel = ""

    if (this.deleteAll==true){
      this.http.delete('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json').subscribe((response) => {
        console.log("Everything is deleted!")
        this.openSnackBar("Everything is deleted!")
        this.isDeleted = true
      });
    }
    setTimeout(()=>{
      this.isDeleted = false;
    }, 3000);
    this.deleteAll = false
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 2000
    });
  }

}
