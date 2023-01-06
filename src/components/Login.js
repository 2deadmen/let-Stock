import React, { useContext,useState,useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteContext from "./NoteContext";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Reaptcha from "reaptcha";

const Login = () => {
  const context = useContext(NoteContext);
    let { setforgotemail,showalert} =context;
    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef(null);

    const siteKey = "6LcoWtcjAAAAAC-Al1mTJVnEls0O0gPgfnISa-ZA";

  const [creds, setcreds] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if(captchaToken==null){
      let text=document.getElementById('captcha')
    text.innerHTML="complete Recaptcha before submitting"
      text.style.color='red'
    }
    if(captchaToken){
      
    const response = await fetch(`https://let-stock.vercel.app/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const json = await response.json();

    if (json.success) {
      sessionStorage.setItem("token", json.authToken);
      navigate("/");
      showalert("Hello there..!!!","success")
    } else {
      let alert=json['error']
      showalert(alert,"danger")
      
    }
    }
  };

  const handleforgot= async (e)=>{
    e.preventDefault();
    if (creds.email===""){
      showalert("email is required","danger")
      
    }

    else{
      setforgotemail(creds.email);
    const response = await fetch(`https://let-stock.vercel.app/api/auth/forgotpass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email }),
    });
    const json = await response.json();
    
    setTimeout(() => {
      showalert("password reset email is sent your given gmail","success")
      
    }, 1000);
  }
  }
  function handleshowpass() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const [profile, setprofile] = useState("")
  const clientId = '594736525168-qk26qtde1i8fr3jqflqm18mdrn5536q8.apps.googleusercontent.com';
  useEffect(() => {
   
      const initClient = () => {
          gapi.client.init({
              clientId: clientId,
              scope: ''
          });
      };
      gapi.load('client:auth2', initClient);
  
  });
  
  const onSuccess = async(res) => {
      setprofile(res.profileObj);
      const response = await fetch(`https://let-stock.vercel.app/api/auth/login`, {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: profile.email, password: profile.email }),
    });
    const json = await response.json();

    if (json.success) {
      sessionStorage.setItem("token", json.authToken);
      
      navigate("/");
      showalert("Hello there..!!!","success")
     

    }else {
      let alert=json['error']
      showalert(alert,"danger")
      
    }

  };

  const onFailure = (err) => {
      console.log('failed', err);
  };

 //REcaptcha function
  const verify = () => {
    captchaRef.current.getResponse().then((res) => {
      setCaptchaToken(res);
    });
    
  };
  const expire = () => {
    captchaRef.current.getResponse().then(() => {
      setCaptchaToken(null);
    });
    
  };
  const error = () => {
    captchaRef.current.getResponse().then(() => {
      captchaRef.current.reset()
    });
    
  };
  
  const styling=()=>{
    let btn  = document.getElementById('exampleInputEmail1')
    btn.style.cssText='box-shadow: 0px 15px 10px -15px #0F393A;border:1.5px solid  #0F393A'
    
    btn.addEventListener('blur',()=>{
      btn.style.cssText=''
    })


  }
  const styling1=()=>{
    let btn  = document.getElementById('myInput')
    btn.style.cssText='box-shadow: 0px 15px 10px -15px #0F393A;border:1.5px solid  #0F393A'
    
    btn.addEventListener('blur',()=>{
      btn.style.cssText=''
    })


  }
 
  return (
    <> 
    <div className="container my-2">
    <div align='center'><GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
                <br /><small className="">or</small></div>
                
      <form className="container px-10 my-5 w-50 " onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
           onFocus={styling}
            onChange={onChange}
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
    <input
    onFocus={styling1}
            type="password"
            className="form-control"
            required
            minLength={8}
            name="password"
            id="myInput"
            onChange={onChange}
            placeholder="Password"
          /><input type="checkbox" className="my-2" onClick={handleshowpass}/> Show Password
        </div> 
       
  
  {/* recaptcha */}
<div>  <Reaptcha
            sitekey={siteKey}
            ref={captchaRef}
            onVerify={verify}
            onExpire={expire}
            onError={error}
          ></Reaptcha>
         <small id="captcha"></small>
 </div>


        <button type="submit" className="btn btn my-2">
          Submit
        </button> <br />
        <small>Don't have an account?<Link to='/Signup'>register here</Link>
  </small>
  <small className="mx-4"><Link onClick={handleforgot}>forgot password..??</Link></small>
      </form>
      
      </div>  </>
  );
};

export default Login;