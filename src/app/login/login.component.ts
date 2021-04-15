import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationService } from '../communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private data: CommunicationService, private router: Router) { }

  // txt = uuidv4();
  hide = true;
  signlog = "";
  password = "";
  username = "";
  obj: any[]=[];

  ngOnInit(): void {
  //   let auth = {user: "001",password: "001",id:this.txt}
  //   this.http.post('https://notes-c66a1-default-rtdb.firebaseio.com/auths.json',auth).subscribe(responseData => {
  //       console.log(responseData);
  //     });
    this.http.get('https://notes-c66a1-default-rtdb.firebaseio.com/auths.json').subscribe((responseData:any) => {
      Object.keys(responseData).forEach(element => {
        this.obj.push(responseData[element].user);
      });
      console.log("obj: ",this.obj);
    });
  }

  onConfirm(){
    let txt = uuidv4();
    let userExists = []
    // console.log("u ",this.username)
    // console.log("p ",this.password)

    userExists = this.obj.filter(el => {
      return el == this.username
    })
    // console.log("users: ",userExists)
    if(this.signlog=="signup"){
      if (userExists.length==0) {
        let auth = {user: this.username,password: this.password,id:txt}
        this.http.post('https://notes-c66a1-default-rtdb.firebaseio.com/auths.json',auth).subscribe(
          (responseData) => {
            this.updateUsername()
            console.log("New user added");
            this.router.navigateByUrl('/notes');
          },
          (error) => {
            console.log("Error: ",error)
          });
      } else {
        console.log("User already exists!")
        this.openSnackBar("Utente già esistente!")
      }
    } else if (this.signlog=="login") {
        if (userExists.length==0){
          console.log("User does not exist!")
          this.openSnackBar("Utente non esistente!")
        } else {
          this.updateUsername()
          console.log("Welcome back user "+this.username+"!")
          this.router.navigateByUrl('/notes');
        }
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 2000
    });
  }

  updateUsername(){
    this.data.changeMessage(this.username)
    // this.data.currentMessage.subscribe(message => console.log("message: "+message))
  }

}
