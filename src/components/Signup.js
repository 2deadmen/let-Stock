import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();

  const [creds, setcreds] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onchange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (creds.password === creds.cpassword) {
      const response = await fetch(`https://let-stock.vercel.app/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: creds.name,
          email: creds.email,
          password: creds.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        sessionStorage.setItem("token", json.authToken);
        navigate("/");
       // props.showalert("account created  succesfully","success")

      } else {
     //   props.showalert("wrong credentials","danger")
      }
    } else {
      //props.showalert("passwords do not match","danger")
    }
  };
  function handleshowpass() {
    var x = document.getElementById("myInput");
    var x1 = document.getElementById("confirmpass");
    if (x.type === "password") {
      x.type = "text";
      x1.type="text"
    } else {
      x.type = "password";
      x1.type="password"
    }
  }

  const strengthcheck=()=>{
    var pwd = document.getElementById("myInput");
      var strength = document.getElementById('strength');
      var strongRegex = new RegExp("^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
      var mediumRegex = new RegExp("^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
      var enoughRegex = new RegExp("(?=.{8,}).*", "g");
     
      if (pwd.value.length === 0) {
          strength.innerHTML = '';
      } else if (false === enoughRegex.test(pwd.value)) {
          strength.innerHTML = 'Give atleast 8 Characters';
      } else if (strongRegex.test(pwd.value)) {
          strength.innerHTML = '<span style="color:green">Strong!</span>';
           pwd.style.cssText=" box-shadow: 0 1px 5px 0 green"
      } else if (mediumRegex.test(pwd.value)) {
          strength.innerHTML = '<span style="color:orange">Medium!A combination of special characters and symbols</span>';
           pwd.style.cssText=" box-shadow:0 1px 5px 0  orange"
      } else {
          strength.innerHTML = '<span style="color:red">Weak! Use combination of uppercase letters, lowercase letters, numbers, and symbols</span>';
          pwd.style.cssText=" box-shadow:0 1px 5px 0 red"
      }
  }

  const removestyle=()=>{
    var pwd = document.getElementById("myInput");
    pwd.style.cssText=" box-shadow:0 0 white"
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="container w-50 my-2">
        <div className="form-group my-2">
          <div>
            <label className="my-2" htmlFor="name">
              Name
            </label>
            <input
              className="form-control"
              onChange={onchange}
              type="text"
              placeholder=" Enter your Name"
              id="name"
              name="name"
            />
          </div>
          <label className="my-2" htmlFor="exampleInputEmail1">
            Email address
          </label>
          <input
            onChange={onchange}
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
    <input
            type="password"
            className="form-control"
            required
            minLength={5}
            name="password"
            id="myInput"
            onChange={onchange}
            onKeyUp={strengthcheck}
            onBlur={removestyle}
            placeholder="Password"
          /> <small><span id="strength"></span></small>
        </div> 
       
        <div className="form-group">
          <label className="my-1" htmlFor="exampleInputPassword1">
            Confirm Password
          </label>
          <input
            onChange={onchange}
            required
            minLength={5}
            type="password"
            name="cpassword"
            className="form-control"
            id="confirmpass"
            placeholder="Confirm Password"
          /><input type="checkbox" className="my-2" onClick={handleshowpass}/> Show Password
        </div>
        <div>
          <button type="submit" className="btn btn-primary my-2 ">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
