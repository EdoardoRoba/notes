import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ThemePalette } from '@angular/material/core';

export interface DialogData {
  category: string,
  title: string,
  content: string,
  data: any
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "";
  content = "";
  expDate = "";
  category = "";

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

  constructor(private http: HttpClient,private store: AngularFirestore,public dialog: MatDialog){}
  
  ngOnInit() {
    this.http.get('https://notes-c66a1-default-rtdb.firebaseio.com/auths.json').subscribe((responseData:any) => {
      let obj: any[]=[];
      Object.keys(responseData).forEach(element => {
        obj.push(responseData[element]);
      });
      let utenteObj = obj.filter((element:any) => {
        return element.user === "a000" //to be dynamic with user
      })
      this.user = utenteObj[0].user
      console.log("utente: ", this.user)
    });

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
      // console.log("keys: ",this.keysData)
    });
    // let auth = {user: "001",password: "001"}
    // this.http.post('https://notes-c66a1-default-rtdb.firebaseio.com/auths.json',auth).subscribe(responseData => {
    //     console.log(responseData);
    //   });
  }

  onPost() {
    let nota = {title: this.title, content: this.content, expiring: this.expDate, category: this.category, user: this.user}
    if ((this.title!="") && (this.content!="") && (this.expDate!="") && (this.category!="")){
      this.http.post('https://notes-c66a1-default-rtdb.firebaseio.com/notes/'+this.user+'/'+this.category+'.json',nota).subscribe(responseData => {
        console.log("posted: ",responseData);
      });
      // this.valid = true;
      this.title = ''; 
      this.content = '';
      this.expDate = '';
      this.category = '';

      this.retrievedData = []
      this.keysData = []
      this.http.get('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json').subscribe((responseData:any) => {
      Object.keys(responseData).forEach(element => {
        this.retrievedData.push(responseData[element]);
        this.keysData.push(element);
        // console.log("newData: ",this.retrievedData)
      });
    });
    }
    // this.valid = false;
  }

  onGet() {

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
    console.log("dataToShow: ",dataToShow)

    //Inject the data in the dialog
    const dialogRef = this.dialog.open(DialogComponent,{
      data: dataToShow
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.retrievedData = []
    });

  }

  onPut(){

  }

  onDelete(){
    // CATEGORY AND TITLE REQUIRED
    // console.log("notes: ",this.retrievedData[0])
    // let toDeleteKeys: String[]=[]
    // let tmpDel = this.retrievedData

    if (this.categoryDel != ""){
      for (var i=0;i<this.retrievedData.length;i++){
        if(this.retrievedData[i].category == this.categoryDel){
          let kd = this.keysData[i]
          this.http.delete('https://notes-c66a1-default-rtdb.firebaseio.com/notes/'+kd+'.json').subscribe((response) => {
            console.log("Note ",kd," is deleted!")
          });
        }
      }
    }
    this.categoryDel = ""

    if (this.deleteAll==true){
      this.http.delete('https://notes-c66a1-default-rtdb.firebaseio.com/notes.json').subscribe((response) => {
        console.log("Everything is deleted!")
      });
    }
    this.deleteAll = false
  }

}
