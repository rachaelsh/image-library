import { extendObservable } from 'mobx';

export default class UserStore {
  constructor() {
    extendObservable(this, {
      username: "",
      token: "",
      isadmin: false,
      isloggedin: false,
      _id: ""
    });
    this.saveNewUser = this.saveNewUser.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  logUserOut(){
    this.token = "";
    this.username = "";
    this.isloggedin = false;
    this.isadmin = false;
    this._id = "";
  }

  // ADD HANDLING FOR USER SIGN UP ERROR WHEN DUPLICATING A NAME
  // YOU CAN SEND ERRORS IN THE result
  // (extra credit - figure out how to change your route to make
  // an error instead, and catch the error in the promise handing
  // below instead)
  saveNewUser(user){
    fetch('/newuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        password: user.password
      })
    }).then(result => result.json()).then(res => {
      // POSSIBLE ERROR HANDLING CODE
      // if (res.name === "") {
        //
      //}
      // HAROLD DOESN"T THINK BELOW IS NECESSARY
      this.username = res.name;
    });
  }

  authenticateUser(user) {
    // console.log(user.name + " " + user.password);
    fetch('/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        password: user.password
      })
    })
    .then(result => result.json())
    .then( res => {
      if(res.token){
        this.token = res.token;
        this.username = user.name;
        this.isloggedin = true;
        this.isadmin = res.isadmin;
        this._id = res._id;
      }else{
        this.isloggedin = false;
        this.name = "";
      }
    });
  }

}
