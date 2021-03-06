import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userdata;
  token = false;
  path;
  type = 'password';
  constructor(private Router: Router) {
    this.userdata = JSON.parse(localStorage.getItem('token'));
   }

  ngOnInit() {
  }
  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
       return (true);
     }
       alert('You have entered an invalid email address!');
       return (false);
   }
    onLogin(details) {
     console.log(details , '66666666');
     if (details.password === '' && details.email === '') {
       alert('Please enter email and password!');
       return;
     } else if (details.email === '') {
       alert('Please enter email address!');
       return;
     } else if (details.password === '') {
       alert('Please enter password!');
       return;
     }
     if (this.ValidateEmail(details.email)) {
       console.log('valid email');
     } else if (!this.ValidateEmail(details.email)) {
       alert('Please enter valid email!');
        return;
     }
     const xhttp = new XMLHttpRequest();
     xhttp.open('GET', 'http://localhost:3100/login?email=' + details['email'], false);
     xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhttp.send();
     if (xhttp.responseText === 'not found') {
       console.log(xhttp.responseText , 'xhttp.responseText');
       alert('Email not found!');
     } else {
         const res = JSON.parse(xhttp.responseText);
         console.log(res[0].password ,  '555' , details.password  , '33' , details['password']);
         if (res && res.length > 0) {
           if (Number(details.password) === (res[0].password) ) {
               this.Router.navigate(['/pe']);
               this.token = true;
               localStorage.setItem(JSON.stringify(res[0]) , 'token111');
               this.userdata = JSON.parse(localStorage.getItem('token222'));
             } else {
               alert('Password incorrect!');
             }
         }
   
       console.log(JSON.parse(xhttp.responseText) , 'reponse');
     }
   
    }

}
