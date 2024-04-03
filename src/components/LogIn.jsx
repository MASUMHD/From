import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useRef, useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const LogIn = () => {

  const [singInError, setSingInError] = useState("");
  const [singinDone, setSingInDone] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null)

  const hanLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

     // reset error
     setSingInError("");
     setSingInDone("");

    // Add Validation
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        if(result.user.emailVerified){
            setSingInDone("Log In Done");
        }
        else{
            alert('Please verify email address')
        }
      })
      .catch((error) => {
        console.error(error);
        setSingInError(error.message);
      });
  };

  const forgetPassword = () =>{
    const email = emailRef.current.value;
    if(!email){
        
        console.log("please provide an email",emailRef.current.value)
        return;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        console.log("please right email");
        return;
    }

    // send validation email
    sendPasswordResetEmail(auth,email)
    .then(() =>{
        alert("Please Check your email");
    })
    .catch(error =>{
        console.log(error);
    })
  }

  return (
    <div>
      <div className="bg-orange-300 pt-32 h-[600px] w-[600px] rounded-full text-center mx-auto hover:border-8 border-4  p-6 border-dotted border-whit  ">
        <h1 className="text-2xl font-bold">Please Log In</h1>

        <form className="w-full " onSubmit={hanLogIn}>
          <input
            className="w-1/2 mt-5 p-2 rounded-lg"
            type="email"
            name="email"
            ref={emailRef}
            required
            id=""
            placeholder="Email"
          />
          <br />
          <div className="relative">
            <input
              className="w-1/2 mt-5 p-2 rounded-lg"
              type={ShowPassword ? "text" : "password"}
              name="password"
              id=""
              required
              placeholder="Password"
            />
            <span
              className="absolute text-slate-400 top-1/2 text-xl -ml-6"
              onClick={() => setShowPassword(!ShowPassword)}
            >
              {ShowPassword ? <FaEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          <br />
          <a onClick={forgetPassword} href="#" className="-ml-32">Forgot Password?</a>
          <br />

          <button className="btn btn-secondary w-1/2 mt-5">Log In</button>
        </form>
        <div className="mt-5">
          {singInError && <p className="text-red-500">{singInError}</p>}
          {singinDone && <p className="text-green-700">{singinDone}</p>}
          <p>
            New to this website? please <Link to="/singin">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
