import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  txt = uuidv4();
  hide = true;
  signlog = "";
  password = "";
  username = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  //   let auth = {user: "001",password: "001",id:this.txt}
  //   this.http.post('https://notes-c66a1-default-rtdb.firebaseio.com/auths.json',auth).subscribe(responseData => {
  //       console.log(responseData);
  //     });
  }

  onChange(){
    console.log("u ",this.username)
    console.log("p ",this.password)
  }

}
